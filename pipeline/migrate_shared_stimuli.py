#!/usr/bin/env python3
"""Safely upgrade existing paper JSON to shared stimuli + flat quiz items."""

import argparse
import json
import shutil
import sys
import uuid
from typing import Optional
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(Path(__file__).parent))
from quiz_model import build_quiz_model

PAPERS = ROOT / "processed_papers" / "papers"
PAGE_IMAGES = ROOT / "processed_papers" / "page_images"
BACKUPS = ROOT / "processed_papers" / "migration_backups"


def stable_child_id(parent_id: str, label: str) -> str:
    return str(uuid.uuid5(uuid.UUID(parent_id), label))


def child(parent: dict, label: str, prompt: str, existing_id: Optional[str] = None) -> dict:
    return {
        "questionId": existing_id or stable_child_id(parent["questionId"], label),
        "paperId": parent["paperId"], "questionNumber": f"{parent['questionNumber']}_{label}",
        "section": parent.get("section", ""), "questionText": prompt,
        "questionType": "short_answer", "options": [], "correctAnswer": None,
        "markingGuide": None, "marks": 1, "pageNumber": parent["pageNumber"],
        "images": [], "hasStimulus": False, "stimulusPhrase": None,
        "stimulusType": None, "subQuestions": [], "ocrConfidence": parent.get("ocrConfidence"),
        "needsReview": False, "reviewNotes": "", "parentQuestionId": parent["questionId"],
    }


def upgrade_known_groups(paper: dict):
    by_num = {q["questionNumber"]: q for q in paper.get("questions", [])}
    q55 = by_num.get("55")
    if q55:
        old = q55.get("subQuestions", [])
        ids = [s["questionId"] for s in old]
        q55["questionText"] = "The table below shows characteristics of different types of soil. Use it to answer the questions below."
        prompts = [
            ("a_i", "Identify the type of soil at A."),
            ("a_ii", "Identify the type of soil at C."),
            ("b_i", "Which soil sample would you use for making pots?"),
            ("b_ii", "Which soil sample would you use for filtering muddy water?"),
        ]
        q55["subQuestions"] = [child(q55, label, prompt, ids[i] if i < len(ids) else None) for i, (label, prompt) in enumerate(prompts)]

    q53 = by_num.get("53")
    if q53:
        old = q53.get("subQuestions", [])
        old_ids = [s["questionId"] for s in old]
        prompts = [
            ("a", "Name the part labelled X."),
            ("b", "Of what use are the structures marked R to mushrooms?"),
            ("c", "How do mushrooms feed?"),
            ("d", "How do people benefit from growing mushrooms?"),
        ]
        q53["questionText"] = "The diagram below shows a mushroom. Study it and answer the questions which follow."
        q53["subQuestions"] = [child(q53, label, prompt, old_ids[i] if i < len(old_ids) else None) for i, (label, prompt) in enumerate(prompts)]


def make_stimuli(paper: dict) -> list[dict]:
    stimuli = []
    for q in paper.get("questions", []):
        if not q.get("hasStimulus"):
            continue
        page = q.get("pageNumber", 0)
        images = q.get("images", [])
        image = images[0] if images else None
        path = image.get("localPath") if image else str(PAGE_IMAGES / paper["paperId"] / f"page_{page:02d}.png")
        linked = [s["questionId"] for s in q.get("subQuestions", [])] or [q["questionId"]]
        kind = q.get("stimulusType") or "picture"
        structured = None
        status = "linked" if image else "needs_review"
        notes = "" if image else "Full page fallback; confirm or correct crop."
        if q.get("questionNumber") == "55":
            kind, status, notes = "structured_table", "approved", ""
            structured = {
                "columns": ["A", "B", "C"],
                "rows": [[
                    "Dark in colour; Has a lot of humus; Has silt",
                    "Coarse or rough; Largest air spaces; Highly aerated; Has bigger particles",
                    "Sticky or slippery when it rains; Water logged; Has finest particles",
                ]],
            }
        stimuli.append({
            "stimulusId": f"stimulus_{q['questionId']}", "paperId": paper["paperId"],
            "parentQuestionId": q["questionId"], "type": kind if kind == "structured_table" else (kind if image else "full_page"),
            "title": f"{kind.replace('_', ' ').title()} for Question {q['questionNumber']}",
            "instructionText": q.get("questionText", ""), "localPath": path,
            "remoteUrl": image.get("remoteUrl") if image else None, "structuredTable": structured,
            "sourcePage": page, "bbox": image.get("bbox") if image else None,
            "linkedQuizItemIds": linked, "status": status, "needsReview": status == "needs_review",
            "reviewNotes": notes, "caption": image.get("caption", "") if image else f"Original page {page}",
            "altText": image.get("altText", "") if image else f"Original page for Question {q['questionNumber']}",
        })
    return stimuli


def migrate(path: Path, dry_run: bool):
    paper = json.loads(path.read_text())
    upgrade_known_groups(paper)
    stimuli = make_stimuli(paper)
    items, groups = build_quiz_model(paper.get("questions", []), stimuli)
    paper["schemaVersion"] = 2
    paper["sharedStimuli"], paper["quizItems"], paper["questionGroups"] = stimuli, items, groups
    paper["questionCount"] = len(items)
    print(f"{path.name}: {len(items)} quiz items, {len(stimuli)} stimuli, {len(groups)} groups")
    if dry_run:
        return
    BACKUPS.mkdir(parents=True, exist_ok=True)
    backup = BACKUPS / f"{path.stem}.pre_stimulus.json"
    if not backup.exists(): shutil.copy2(path, backup)
    path.write_text(json.dumps(paper, indent=2, ensure_ascii=False))


def main():
    ap = argparse.ArgumentParser(description="Upgrade all existing SchoolQuest papers to shared-stimulus schema")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    for path in sorted(PAPERS.glob("*.json")): migrate(path, args.dry_run)


if __name__ == "__main__": main()
