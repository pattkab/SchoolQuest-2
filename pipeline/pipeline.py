#!/usr/bin/env python3
"""
SchoolQuest OCR Pipeline — Main Entry Point

Usage:
  python pipeline.py               # Discover + process all unprocessed PDFs
  python pipeline.py --discover    # Only run PDF discovery
  python pipeline.py --status      # Show processing status
  python pipeline.py --id <id>     # Reprocess a specific paper by ID
  python pipeline.py --batch <n>   # Process at most n papers
"""

import argparse
import json
import sys
import traceback
from datetime import datetime
from pathlib import Path
from typing import Optional

# Ensure pipeline/ is on the path
sys.path.insert(0, str(Path(__file__).parent))

from discover import run_discovery, load_index, save_index, PROCESSED_DIR
from ocr import ocr_pdf
from parser import parse_pages_to_questions as _regex_parse
from image_extractor import extract_visual_blocks, link_images_to_questions
from quiz_model import build_quiz_model

# Use LLM parser when ANTHROPIC_API_KEY is available and --llm flag is set.
# Falls back to the battle-tested regex parser otherwise.
def parse_pages_to_questions(page_results, paper_id, *, use_llm=False):
    if use_llm:
        try:
            from parser_llm import parse_pages_to_questions as _llm_parse
            return _llm_parse(page_results, paper_id)
        except Exception as e:
            print(f"    [LLM] Failed ({e}), falling back to regex parser.")
    return _regex_parse(page_results, paper_id)

PAPERS_DIR = PROCESSED_DIR / "papers"


def load_paper_json(paper_id: str) -> Optional[dict]:
    p = PAPERS_DIR / f"{paper_id}.json"
    if p.exists():
        with open(p) as f:
            return json.load(f)
    return None


def save_paper_json(paper_data: dict):
    PAPERS_DIR.mkdir(parents=True, exist_ok=True)
    path = PAPERS_DIR / f"{paper_data['paperId']}.json"
    with open(path, "w", encoding="utf-8") as f:
        json.dump(paper_data, f, indent=2, ensure_ascii=False)
    return path


def process_paper(paper: dict, index: dict, use_llm: bool = False) -> bool:
    """Run OCR + parse on a single paper. Updates index in-place. Returns success."""
    paper_id = paper["paperId"]
    print(f"\n{'='*60}")
    print(f"Processing: {paper['fileName']}")
    print(f"  ID: {paper_id}")

    # Mark as processing
    paper["status"] = "processing"
    save_index(index)

    try:
        # Step 1: OCR
        ocr_result = ocr_pdf(paper)
        if ocr_result is None:
            raise RuntimeError("OCR returned None — PDF may be corrupt or unreadable.")

        # Step 2: Extract visual blocks from each page
        print("\n  Extracting visual blocks...")
        page_blocks: dict = {}
        page_heights: dict = {}
        images_found = 0
        for page_result in ocr_result["pages"]:
            pn = page_result["pageNumber"]
            page_img = page_result.get("pageImage")
            word_data = page_result.get("wordData", {})
            if page_img is not None and word_data:
                blocks = extract_visual_blocks(page_img, word_data, paper_id, pn)
                if blocks:
                    page_blocks[pn] = blocks
                    images_found += len(blocks)
                    print(f"    Page {pn}: {len(blocks)} visual block(s) detected.")
                page_heights[pn] = page_img.size[1] if page_img else 0
        if images_found:
            print(f"  Total visual blocks: {images_found}")
        else:
            print("  No visual blocks detected.")

        # Step 3: Parse questions
        print("\n  Parsing questions...")
        questions = parse_pages_to_questions(ocr_result["pages"], paper_id, use_llm=use_llm)
        print(f"  Extracted {len(questions)} questions.")

        needs_review_count = sum(1 for q in questions if q.get("needsReview"))
        if needs_review_count:
            print(f"  Flagged for review: {needs_review_count} questions.")

        # Step 4: Link visual blocks to questions
        stimulus_count = sum(1 for q in questions if q.get("hasStimulus"))
        if stimulus_count:
            print(f"  Stimulus phrases detected in {stimulus_count} question(s).")
        questions, shared_stimuli = link_images_to_questions(
            questions, page_blocks, page_heights, ocr_result.get("pageImagePaths", {})
        )
        linked = sum(1 for q in questions if q.get("images"))
        if linked:
            print(f"  Linked images to {linked} question(s).")
        quiz_items, question_groups = build_quiz_model(questions, shared_stimuli)
        print(f"  Built {len(quiz_items)} independently answerable quiz items.")

        # Step 5: Build paper data record
        header = ocr_result.get("header", {})
        paper_data = {
            "paperId": paper_id,
            "title": header.get("title") or paper["title"],
            "subject": header.get("subject") or paper["subject"],
            "level": header.get("level") or paper["level"],
            "year": header.get("year") or paper["year"],
            "term": paper.get("term", ""),
            "examBody": header.get("examBody", ""),
            "sourceFile": paper["filePath"],
            "fileName": paper["fileName"],
            "pages": paper["pages"],
            "ocrConfidence": ocr_result["overallConfidence"],
            "status": "needs_review" if ocr_result["needsReview"] else "processed",
            "processedAt": datetime.utcnow().isoformat() + "Z",
            "questionCount": len(questions),
            "questions": questions,
            "quizItems": quiz_items,
            "questionGroups": question_groups,
            "sharedStimuli": shared_stimuli,
            "pageImagePaths": ocr_result.get("pageImagePaths", {}),
        }

        # Step 6: Save paper JSON (strip pageImage PIL objects first)
        for pr in ocr_result.get("pages", []):
            pr.pop("pageImage", None)
            pr.pop("wordData", None)
        out_path = save_paper_json(paper_data)
        print(f"  Saved: {out_path}")

        # Step 7: Update index entry
        paper["status"] = paper_data["status"]
        paper["processedAt"] = paper_data["processedAt"]
        paper["subject"] = paper_data["subject"]
        paper["level"] = paper_data["level"]
        paper["year"] = paper_data["year"]
        paper["error"] = None

        return True

    except Exception as e:
        tb = traceback.format_exc()
        print(f"\n  FAILED: {e}")
        print(tb)
        paper["status"] = "failed"
        paper["error"] = str(e)
        paper["processedAt"] = datetime.utcnow().isoformat() + "Z"
        return False


def show_status(index: dict):
    papers = index["papers"]
    print(f"\nSchoolQuest — Pipeline Status ({len(papers)} papers)\n")
    counts: dict[str, int] = {}
    for p in papers:
        s = p["status"]
        counts[s] = counts.get(s, 0) + 1
        icon = {"processed": "✓", "needs_review": "⚠", "failed": "✗", "processing": "…"}.get(s, "·")
        print(f"  {icon} [{s:14s}] {p['fileName']}")
        if p.get("error"):
            print(f"             Error: {p['error']}")

    print("\nSummary:")
    for status, count in sorted(counts.items()):
        print(f"  {status}: {count}")


def main():
    parser = argparse.ArgumentParser(description="SchoolQuest OCR Pipeline")
    parser.add_argument("--discover", action="store_true", help="Only run PDF discovery")
    parser.add_argument("--status", action="store_true", help="Show processing status")
    parser.add_argument("--id", help="Process a specific paper by ID")
    parser.add_argument("--batch", type=int, default=None, help="Process at most N papers")
    parser.add_argument("--reprocess", action="store_true", help="Reprocess already-processed papers")
    parser.add_argument("--reprocess-all", action="store_true", help="Reprocess every paper with shared-stimulus support")
    parser.add_argument("--llm", action="store_true", help="Use Claude LLM parser instead of regex (requires ANTHROPIC_API_KEY with credits)")
    args = parser.parse_args()

    # Always run discovery to catch new files
    print("=== SchoolQuest Pipeline ===\n")
    index = run_discovery()

    if args.discover or args.status:
        if args.status:
            show_status(index)
        return

    papers = index["papers"]

    if args.id:
        targets = [p for p in papers if p["paperId"] == args.id]
        if not targets:
            print(f"No paper found with ID: {args.id}")
            sys.exit(1)
    elif args.reprocess or args.reprocess_all:
        targets = papers
    else:
        targets = [p for p in papers if p["status"] in ("not_started", "failed")]

    if args.batch:
        targets = targets[: args.batch]

    if not targets:
        print("\nNothing to process. Use --reprocess to re-run already processed papers.")
        show_status(index)
        return

    print(f"\nProcessing {len(targets)} paper(s)...\n")

    if args.llm:
        print("  Parser: Claude LLM (claude-haiku-4-5-20251001)\n")

    success = 0
    failed = 0
    for paper in targets:
        ok = process_paper(paper, index, use_llm=args.llm)
        if ok:
            success += 1
        else:
            failed += 1
        save_index(index)

    print(f"\n{'='*60}")
    print(f"Pipeline complete:  {success} processed  |  {failed} failed")
    show_status(index)


if __name__ == "__main__":
    main()
