"""
LLM-based question parser — replaces regex parser.py.

Sends OCR'd page text to Claude Haiku in chunks, extracts structured questions,
maps to the pipeline's internal question schema.
"""

import json
import os
import re
import uuid
from pathlib import Path
from typing import Optional

import anthropic

from image_extractor import detect_stimulus_phrases

# Load .env from pipeline directory if present (fallback for local dev)
_env_file = Path(__file__).parent / ".env"
if _env_file.exists() and not os.environ.get("ANTHROPIC_API_KEY"):
    for _line in _env_file.read_text().splitlines():
        if "=" in _line and not _line.startswith("#"):
            _k, _v = _line.split("=", 1)
            os.environ.setdefault(_k.strip(), _v.strip())

# ── Config ────────────────────────────────────────────────────────────────────

MODEL       = "claude-haiku-4-5-20251001"
MAX_TOKENS  = 8000          # Haiku max output
PAGES_CHUNK = 8             # pages per LLM call — smaller chunks avoid hitting output token limit

SYSTEM_PROMPT = """You are an expert exam paper parser and quiz generator specialised in Uganda primary school past papers.
Your task is to accurately extract every question and its corresponding answer(s) from the supplied OCR text.

**Strict Rules:**
- Process content in the exact order it appears.
- Keep the original question numbering (1., 1a, 1(a), 2., etc.). Do NOT invent, skip, or renumber.
- Detect the subject from the exam header (e.g. "PRIMARY FOUR- MATHEMATICS" → subject "Mathematics").
- Detect the section from section headers (e.g. "SECTION A", "SECTION B", "PART I").
- Each question must be fully self-contained. Never mix text from different questions.
- Detect and list multi-part questions (3a, 3b, 3(i)) as SEPARATE question objects with numbers like "3a", "3b".
- If figures/diagrams are referenced, describe them in figure_descriptions[].
- Extract correct answers ONLY if an answer key or mark scheme is present. Otherwise use null.
- For MCQ, extract options as ["A) text", "B) text", ...].
- Correct obvious OCR errors (broken words, stray line breaks) while preserving meaning.
- Output ONLY valid JSON — no commentary, no markdown fences.

**Output JSON schema:**
{
  "paper_title": "string or null",
  "questions": [
    {
      "number": "1",
      "subject": "Mathematics",
      "section": "Section A",
      "full_question_text": "Complete, clean question text.",
      "figure_descriptions": [],
      "options": ["A) ...", "B) ..."] or null,
      "correct_answer": "Answer text, or null if not in document",
      "marks": "2 marks" or null
    }
  ]
}"""


# ── Option parsing ─────────────────────────────────────────────────────────────

def _parse_options(raw: Optional[list]) -> list:
    """Convert ["A) text", "B) text"] → [{"label": "A", "text": "text"}]."""
    if not raw:
        return []
    result = []
    for item in raw:
        m = re.match(r"^([A-D])\)\s*(.*)", str(item).strip(), re.DOTALL)
        if m:
            result.append({"label": m.group(1), "text": m.group(2).strip()})
    return result


def _detect_type(text: str, options: list) -> str:
    if options:
        return "multiple_choice"
    lo = text.lower()
    if re.search(r"(choose|circle|tick|underline|select)\s+the\s+(correct|right|best)", lo):
        return "multiple_choice"
    if re.search(r"\btrue\b.*\bfalse\b|\bfalse\b.*\btrue\b", lo):
        return "true_false"
    if re.search(r"\bmatch\b|\bpair\b.*\bcolumn\b", lo):
        return "matching"
    if re.search(r"fill\s+in|\bblank\b", lo):
        return "fill_in_blank"
    if re.search(r"\bcalculate\b|\bfind\b|\bcompute\b|\bwork\s+out\b|\bsolve\b", lo):
        return "calculation"
    if re.search(r"\bdraw\b|\bsketch\b|\blabel\b", lo):
        return "diagram"
    return "short_answer"


def _to_pipeline_question(raw_q: dict, paper_id: str, page_num: int) -> Optional[dict]:
    """Map a single LLM question dict to the pipeline schema."""
    text = (raw_q.get("full_question_text") or "").strip()
    if not text or len(text) < 4:
        return None

    opts   = _parse_options(raw_q.get("options"))
    q_num  = str(raw_q.get("number", "")).strip()
    figs   = raw_q.get("figure_descriptions") or []
    answer = raw_q.get("correct_answer")
    marks  = raw_q.get("marks")

    has_stim = bool(figs)
    stim_phrase = figs[0] if figs else ""
    stimulus = detect_stimulus_phrases(text + " " + stim_phrase)

    return {
        "questionId":     str(uuid.uuid4()),
        "paperId":        paper_id,
        "questionNumber": q_num,
        "section":        (raw_q.get("section") or "").strip(),
        "subject":        (raw_q.get("subject") or "").strip(),
        "questionText":   text,
        "questionType":   _detect_type(text, opts),
        "options":        opts,
        "correctAnswer":  answer if (answer and answer != "Not provided in document") else None,
        "markingGuide":   None,
        "marks":          marks,
        "pageNumber":     page_num,
        "images":         [],
        "hasStimulus":    has_stim or stimulus["hasStimulus"],
        "stimulusPhrase": stim_phrase or stimulus["phrase"],
        "stimulusType":   "figure" if figs else stimulus["stimulusType"],
        "subQuestions":   [],
        "ocrConfidence":  95.0,
        "needsReview":    False,
        "reviewNotes":    "",
        "_stimulus":      stimulus,
        "_figureDes":     figs,
    }


# ── Per-chunk LLM call ────────────────────────────────────────────────────────

def _repair_truncated_json(raw_text: str) -> list:
    """Extract complete question objects from truncated/malformed JSON using bracket matching."""
    q_start = raw_text.find('"questions"')
    if q_start == -1:
        return []
    bracket = raw_text.find('[', q_start)
    if bracket == -1:
        return []

    questions = []
    depth = 0
    obj_start = None
    in_string = False
    escape_next = False

    for i, c in enumerate(raw_text[bracket + 1:], bracket + 1):
        if escape_next:
            escape_next = False
            continue
        if c == '\\' and in_string:
            escape_next = True
            continue
        if c == '"' and not escape_next:
            in_string = not in_string
            continue
        if in_string:
            continue
        if c == '{':
            if depth == 0:
                obj_start = i
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0 and obj_start is not None:
                try:
                    obj = json.loads(raw_text[obj_start:i + 1])
                    if obj.get('number') or obj.get('full_question_text'):
                        questions.append(obj)
                except json.JSONDecodeError:
                    pass
                obj_start = None

    return questions


def _call_llm(client: anthropic.Anthropic, chunk_text: str) -> list:
    """Call Claude and return a list of raw question dicts."""
    try:
        response = client.messages.create(
            model=MODEL,
            max_tokens=MAX_TOKENS,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": chunk_text}],
        )
        raw_text = response.content[0].text.strip()

        # Strip markdown fences if the model wraps output despite instructions
        raw_text = re.sub(r"^```(?:json)?\n?", "", raw_text)
        raw_text = re.sub(r"\n?```$", "", raw_text)

        try:
            data = json.loads(raw_text)
            return data.get("questions", [])
        except json.JSONDecodeError as e:
            print(f"    [LLM] JSON truncated ({e}), attempting repair...")
            recovered = _repair_truncated_json(raw_text)
            if recovered:
                print(f"    [LLM] Repaired: recovered {len(recovered)} question(s)")
            else:
                print(f"    [LLM] Repair failed — chunk skipped")
            return recovered

    except anthropic.APIError as e:
        print(f"    [LLM] API error: {e} — chunk skipped")
        return []


# ── Main entry point ──────────────────────────────────────────────────────────

def parse_pages_to_questions(page_results: list, paper_id: str) -> list:
    """
    Drop-in replacement for parser.parse_pages_to_questions().
    Calls Claude Haiku in PAGES_CHUNK-page windows, merges results.
    """
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        raise RuntimeError(
            "ANTHROPIC_API_KEY environment variable not set. "
            "Export it before running the pipeline."
        )
    client = anthropic.Anthropic(api_key=api_key)

    # Split pages into chunks
    chunks: list[list] = []
    for i in range(0, len(page_results), PAGES_CHUNK):
        chunks.append(page_results[i : i + PAGES_CHUNK])

    print(f"    [LLM] {len(page_results)} pages → {len(chunks)} chunk(s) → {MODEL}")

    seen: dict = {}   # (subject, section, number) → question dict

    for chunk_idx, chunk in enumerate(chunks):
        first_page = chunk[0]["pageNumber"]
        last_page  = chunk[-1]["pageNumber"]
        print(f"    [LLM] Chunk {chunk_idx + 1}/{len(chunks)}: pages {first_page}–{last_page}", flush=True)

        # Build text block with page markers
        text_parts = []
        for page in chunk:
            pn   = page["pageNumber"]
            text = page.get("text", "").strip()
            text_parts.append(f"--- PAGE {pn} ---\n{text}")
        chunk_text = "\n\n".join(text_parts)

        raw_questions = _call_llm(client, chunk_text)
        print(f"    [LLM] → {len(raw_questions)} questions extracted")

        # Estimate representative page number for each question in chunk
        # (LLM doesn't tell us the exact page per question — use chunk midpoint)
        mid_page = (first_page + last_page) // 2

        for raw_q in raw_questions:
            q = _to_pipeline_question(raw_q, paper_id, mid_page)
            if q is None:
                continue

            # Dedup key: subject + section + question number
            subj = re.sub(r"\s+", "_", q["subject"].upper()) if q["subject"] else "UNKNOWN"
            sec  = re.sub(r"\s+", "_", q["section"].upper()) if q["section"] else "NOSEC"
            key  = f"{subj}|{sec}|{q['questionNumber']}"

            if key not in seen:
                seen[key] = q
            else:
                # Merge continuation text (same question across page boundary)
                ex = seen[key]
                new_text = q["questionText"]
                if new_text and new_text not in ex["questionText"]:
                    ex["questionText"] = (ex["questionText"] + "\n" + new_text).strip()

    # Sort: by subject, then section, then numeric part of question number
    def sort_key(q: dict) -> tuple:
        num = q["questionNumber"]
        m   = re.match(r"^(\d+)", num)
        return (q["subject"], q["section"], int(m.group(1)) if m else 9999, num)

    return sorted(seen.values(), key=sort_key)
