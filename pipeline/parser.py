"""
Milestone 3: Question segmentation — parse OCR page text into structured questions.

Handles Uganda primary exam formats:
- Inline: "N. question text" on same line
- Stacked: numbers in left column, text in right column
- Multi-subject holiday packages: embedded exam headers reset question namespace
"""

import re
import uuid
from typing import Optional

from image_extractor import detect_stimulus_phrases

# ── Patterns ───────────────────────────────────────────────────────────────────

Q_INLINE   = re.compile(r"^(\d{1,2})\s*[.)][ \t]+(\S[^\n]*)", re.MULTILINE)
Q_ALONE    = re.compile(r"^(\d{1,2})\s*[.)]\s*$", re.MULTILINE)
Q_BARE     = re.compile(r"^(\d{1,2})\s*$", re.MULTILINE)
DOT_PREFIX = re.compile(r"^\.\s+(\S.+)")

# "SECTION A" / "PART B" headers
SECTION_RE = re.compile(r"^\s*(SECTION\s+[A-Z]|PART\s+[A-Z])\b", re.IGNORECASE)

# Standalone subject-only line  e.g. "MATHEMATICS" or "ENGLISH LANGUAGE"
SUBJECT_LINE_RE = re.compile(
    r"^(MATHEMATICS|ENGLISH\s+LANGUAGE|ENGLISH|SCIENCE|INTEGRATED\s+SCIENCE"
    r"|SOCIAL\s+STUDIES|SST|RELIGIOUS\s+EDUCATION|C\.?R\.?E\.?|I\.?R\.?E\.?)\s*$",
    re.IGNORECASE,
)

# Embedded exam header line  e.g. "PRIMARY FOUR- SCIENCE" or "P.4 MATHEMATICS"
EMBEDDED_EXAM_RE = re.compile(
    r"(?:PRIMARY\s+(?:FOUR|FIVE|SIX|SEVEN)|P\.?\s*[4-7])\s*[-:]\s*"
    r"(MATHEMATICS|ENGLISH(?:\s+LANGUAGE)?|(?:INTEGRATED\s+)?SCIENCE"
    r"|(?:SOCIAL\s+STUDIES|SST)|RELIGIOUS\s+EDUCATION|C\.?R\.?E\.?|I\.?R\.?E\.?)",
    re.IGNORECASE,
)

SKIP_PARA = re.compile(
    r"(questions?\s+\d+\s+to\s+\d+|carry\s+\d+\s+mark|answer\s+all\s+question"
    r"|do\s+not\s+write|questions\s+carry\s+|section\s+[ab]\s*[:\-]"
    r"|holiday\s+package|general\s+instruction|this\s+package\s+is\s+composed"
    r"|parents?\s+can\s+assist|all\s+work\s+in\s+each|marked\s+out\s+of)",
    re.IGNORECASE,
)
SUB_LETTER = re.compile(r"^\s*\(([a-d])\)\s+(.*)", re.MULTILINE)
SUB_ROMAN  = re.compile(r"^\s*\(([ivx]+)\)\s+(.*)", re.IGNORECASE | re.MULTILINE)
MCQ_OPTION = re.compile(r"^([A-D])\s*[.)]\s+(.+)", re.MULTILINE)
MCQ_PAREN  = re.compile(r"^\(([A-D])\)\s+(.+)", re.MULTILINE)

COVER_MARKERS = [
    "uganda national examinations board",
    "primary leaving examination",
    "candidates name",
    "candidates' signature",
    "read the following instructions",
    "for examiners",
    "index no",
]


# ── Helpers ────────────────────────────────────────────────────────────────────

def is_cover_page(text: str) -> bool:
    lower = text.lower()
    return sum(1 for m in COVER_MARKERS if m in lower) >= 3


def is_noise_line(line: str) -> bool:
    s = line.strip()
    if not s:
        return False
    if re.match(r"^[\.\-_~|]{4,}\s*$", s):
        return True
    if re.match(r"^Turn\s*Over\s*$", s, re.I):
        return True
    if re.match(r"©\s*\d{4}", s):
        return True
    return False


def strip_noise_lines(text: str) -> str:
    lines = []
    for line in text.splitlines():
        lines.append("" if is_noise_line(line) else line)
    return re.sub(r"\n{3,}", "\n\n", "\n".join(lines)).strip()


def paragraphs(text: str) -> list:
    raw = [p.strip() for p in re.split(r"\n{2,}", text) if p.strip()]
    merged = []
    for chunk in raw:
        if merged and _is_continuation(merged[-1], chunk):
            merged[-1] = merged[-1] + " " + chunk
        else:
            merged.append(chunk)
    return merged


def _is_continuation(prev: str, curr: str) -> bool:
    if not prev or not curr:
        return False
    if curr[0].islower():
        return True
    if prev[-1] not in ".?!":
        return True
    if len(curr) < 15 and not curr[0].isupper():
        return True
    return False


def clean_question_text(text: str) -> str:
    text = re.sub(r"[\.\-_]{4,}.*$", "", text, flags=re.MULTILINE)
    lines = [l for l in text.splitlines() if not is_noise_line(l)]
    text = "\n".join(lines)
    return re.sub(r"\n{3,}", "\n\n", text).strip()


# ── Option / type detection ────────────────────────────────────────────────────

def detect_type(text: str, options: list) -> str:
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


def extract_options(text: str) -> tuple:
    options, spans = [], []
    for pat in (MCQ_OPTION, MCQ_PAREN):
        for m in pat.finditer(text):
            label = m.group(1).upper()
            if not any(o["label"] == label for o in options):
                options.append({"label": label, "text": m.group(2).strip()})
                spans.append((m.start(), m.end()))
    options.sort(key=lambda o: o["label"])
    cleaned = text
    for s, e in sorted(spans, reverse=True):
        cleaned = cleaned[:s] + cleaned[e:]
    return options, re.sub(r"\n{3,}", "\n\n", cleaned).strip()


# ── Sub-question extraction ────────────────────────────────────────────────────

def extract_subs(text: str, paper_id: str, parent_num: str, page_num: int, conf: float) -> list:
    matches = sorted(
        list(SUB_LETTER.finditer(text)) + list(SUB_ROMAN.finditer(text)),
        key=lambda m: m.start(),
    )
    if not matches:
        return []
    subs = []
    for idx, m in enumerate(matches):
        end = matches[idx + 1].start() if idx + 1 < len(matches) else len(text)
        chunk = text[m.start():end].strip()
        inner = SUB_LETTER.match(chunk) or SUB_ROMAN.match(chunk)
        label = m.group(1)
        sub_text = (inner.group(2) + " " + chunk[inner.end():]).strip() if inner else chunk
        sub_text = re.sub(r"\s{2,}", " ", re.sub(r"\n+", " ", sub_text)).strip()
        opts, clean = extract_options(sub_text)
        subs.append({
            "questionId": str(uuid.uuid4()),
            "paperId": paper_id,
            "questionNumber": f"{parent_num}{label}",
            "section": "",
            "questionText": clean,
            "questionType": detect_type(clean, opts),
            "options": opts,
            "correctAnswer": None, "markingGuide": None, "marks": None,
            "pageNumber": page_num,
            "subQuestions": [],
            "ocrConfidence": conf,
            "needsReview": conf < 70 or len(clean) < 5,
            "reviewNotes": "Low OCR confidence" if conf < 70 else ("Short text" if len(clean) < 5 else ""),
        })
    return subs


# ── Question builder ───────────────────────────────────────────────────────────

def make_q(paper_id: str, q_num: str, section: str, raw_text: str,
           page_num: int, conf: float, *, needs_review: bool = False,
           review_note: str = "") -> Optional[dict]:
    text = clean_question_text(raw_text)
    if not text:
        return None
    subs = extract_subs(text, paper_id, q_num, page_num, conf)
    if subs:
        first = SUB_LETTER.search(text) or SUB_ROMAN.search(text)
        stem = text[:first.start()].strip() if first else text
    else:
        stem = text
    opts, stem_clean = extract_options(stem)
    low   = conf < 70
    short = len(stem_clean) < 8 and not subs
    full  = (stem_clean + " " + " ".join(s["questionText"] for s in subs)).strip()
    stimulus = detect_stimulus_phrases(full)
    return {
        "questionId":    str(uuid.uuid4()),
        "paperId":       paper_id,
        "questionNumber": q_num,
        "section":       section,
        "questionText":  stem_clean,
        "questionType":  detect_type(stem_clean, opts),
        "options":       opts,
        "correctAnswer": None, "markingGuide": None, "marks": None,
        "pageNumber":    page_num,
        "images":        [],
        "hasStimulus":   stimulus["hasStimulus"],
        "stimulusPhrase": stimulus["phrase"],
        "stimulusType":  stimulus["stimulusType"],
        "subQuestions":  subs,
        "ocrConfidence": conf,
        "needsReview":   needs_review or low or short,
        "reviewNotes":   review_note or ("Low OCR confidence" if low else ("Short text" if short else "")),
        "_stimulus":     stimulus,
    }


# ── Page-level parser ─────────────────────────────────────────────────────────

def parse_page(raw_text: str, page_num: int, paper_id: str, conf: float,
               current_section: str, next_q_num: int,
               current_subject: str = "") -> tuple:
    """
    Returns (questions_list, updated_section, updated_next_q_num, updated_subject).
    """
    if is_cover_page(raw_text):
        return [], current_section, next_q_num, current_subject

    text   = strip_noise_lines(raw_text)
    section = current_section
    subject = current_subject   # e.g. "SCIENCE", "MATHEMATICS"

    def strip_headers(t: str) -> str:
        nonlocal section, subject
        lines = []
        for line in t.splitlines():
            s = line.strip()
            me = EMBEDDED_EXAM_RE.search(s)
            ms = SUBJECT_LINE_RE.match(s)
            m  = SECTION_RE.match(s)

            if me:
                # Embedded exam header: "PRIMARY FOUR- SCIENCE"
                subject = re.sub(r"\s+", "_", me.group(1).strip().upper())
                section = subject   # start fresh namespace for this subject
                lines.append("")
            elif ms:
                # Standalone subject line: "MATHEMATICS"
                subject = re.sub(r"\s+", "_", ms.group(1).strip().upper())
                section = subject
                lines.append("")
            elif m:
                # Section header: "SECTION A"
                sec_name = re.sub(r"\s+", "_", m.group(1).strip().upper())
                # Combine with subject so Math Section A ≠ Science Section A
                section = f"{subject}_{sec_name}" if subject else sec_name
                lines.append("")
            else:
                lines.append(line)
        return "\n".join(lines)

    text = strip_headers(text)
    text = re.sub(r"\n{3,}", "\n\n", text).strip()

    questions = []

    # ── Strategy 1: Inline "N. text" ─────────────────────────────────────────
    inline = list(Q_INLINE.finditer(text))
    if inline:
        for i, m in enumerate(inline):
            end   = inline[i + 1].start() if i + 1 < len(inline) else len(text)
            block = text[m.start():end]
            block = re.sub(r"^\d{1,2}\s*[.)]\s*", "", block, count=1).strip()
            q = make_q(paper_id, m.group(1), section, block, page_num, conf)
            if q:
                questions.append(q)
        return questions, section, next_q_num, subject

    # ── Strategy 2: Stacked numbers ──────────────────────────────────────────
    lines   = text.splitlines()
    stacked = []
    stacked_end_line = 0

    for idx, line in enumerate(lines):
        s = line.strip()
        if not s:
            continue
        if Q_ALONE.match(s) or Q_BARE.match(s):
            m2  = Q_ALONE.match(s) or Q_BARE.match(s)
            num = m2.group(1)
            if not stacked or int(num) > int(stacked[-1]):
                stacked.append(num)
                stacked_end_line = idx
        else:
            if len(stacked) >= 3:
                break
            else:
                stacked = []
                break

    if len(stacked) >= 3:
        text_after = "\n".join(lines[stacked_end_line + 1:]).strip()
        text_lines = text_after.splitlines()
        dot_starts = [(i, l) for i, l in enumerate(text_lines) if DOT_PREFIX.match(l.strip())]

        if dot_starts and len(dot_starts) >= 2:
            chunks = []
            for j, (line_idx, _) in enumerate(dot_starts):
                end_idx = dot_starts[j + 1][0] if j + 1 < len(dot_starts) else len(text_lines)
                chunk_lines = text_lines[line_idx:end_idx]
                chunk_lines[0] = DOT_PREFIX.match(chunk_lines[0].strip()).group(1)
                chunks.append(" ".join(l.strip() for l in chunk_lines if l.strip()))
            pre = " ".join(l.strip() for l in text_lines[:dot_starts[0][0]] if l.strip())
            if pre:
                chunks.insert(0, pre)
        else:
            paras  = paragraphs(text_after)
            chunks = [" ".join(l.strip() for l in p.splitlines() if l.strip()) for p in paras]
            chunks = [c for c in chunks if c]

        for idx2, num in enumerate(stacked):
            block = chunks[idx2] if idx2 < len(chunks) else ""
            q = make_q(paper_id, num, section, block, page_num, conf,
                       needs_review=True, review_note="Multi-column page — verify pairing")
            if q:
                questions.append(q)
        for extra in chunks[len(stacked):]:
            q = make_q(paper_id, str(next_q_num), section, extra, page_num, conf,
                       needs_review=True, review_note="Extra text — number uncertain")
            if q:
                questions.append(q)
            next_q_num += 1

        return questions, section, next_q_num, subject

    # ── Strategy 3: Un-numbered ───────────────────────────────────────────────
    for para in paragraphs(text):
        if SECTION_RE.match(para) or SUBJECT_LINE_RE.match(para) or SKIP_PARA.search(para):
            continue
        if len(para.strip()) < 10:
            continue
        q = make_q(paper_id, str(next_q_num), section, para, page_num, conf,
                   needs_review=True, review_note="Number not detected")
        if q:
            questions.append(q)
        next_q_num += 1

    return questions, section, next_q_num, subject


# ── Main entry point ──────────────────────────────────────────────────────────

def parse_pages_to_questions(page_results: list, paper_id: str) -> list:
    seen: dict = {}
    current_section = ""
    current_subject = ""
    next_q_num = 1

    for page in page_results:
        raw      = page.get("text", "")
        page_num = page["pageNumber"]
        conf     = page.get("ocrConfidence", 80.0)

        page_qs, current_section, next_q_num, current_subject = parse_page(
            raw, page_num, paper_id, conf,
            current_section, next_q_num, current_subject,
        )

        for q in page_qs:
            # Dedup key includes section (which encodes subject) so
            # Math Section A Q2 ≠ Science Section A Q2
            sec_key = re.sub(r"\s+", "_", q["section"]) if q["section"] else "NOSEC"
            key = f"{sec_key}|{q['questionNumber']}"

            if key not in seen:
                seen[key] = q
            else:
                ex = seen[key]
                if q["questionText"] and q["questionText"] not in ex["questionText"]:
                    ex["questionText"] = (ex["questionText"] + "\n" + q["questionText"]).strip()
                ex_sub_nums = {s["questionNumber"] for s in ex["subQuestions"]}
                for sub in q["subQuestions"]:
                    if sub["questionNumber"] not in ex_sub_nums:
                        ex["subQuestions"].append(sub)

    def sort_key(q: dict) -> tuple:
        sec = q.get("section", "")
        num = q.get("questionNumber", "0")
        m   = re.match(r"^(\d+)", num)
        return (sec, int(m.group(1)) if m else 9999, num)

    return sorted(seen.values(), key=sort_key)
