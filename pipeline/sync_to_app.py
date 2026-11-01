#!/usr/bin/env python3
"""
Sync processed papers from pipeline output to the app's bundled assets.
Run this after processing new papers to make them available in the app.

Usage: python sync_to_app.py
"""

import json
import shutil
from pathlib import Path

ROOT = Path(__file__).parent.parent
PROCESSED = ROOT / "processed_papers"
APP_PROCESSED = ROOT / "app" / "processed_papers"
APP_STORE = ROOT / "app" / "src" / "data" / "paperStore.ts"


def sync():
    APP_PROCESSED.mkdir(parents=True, exist_ok=True)
    (APP_PROCESSED / "papers").mkdir(parents=True, exist_ok=True)

    # Copy index.json
    shutil.copy2(PROCESSED / "index.json", APP_PROCESSED / "index.json")
    print("Copied index.json")

    # Copy all paper JSONs
    paper_ids = []
    for paper_json in sorted((PROCESSED / "papers").glob("*.json")):
        shutil.copy2(paper_json, APP_PROCESSED / "papers" / paper_json.name)
        paper_ids.append(paper_json.stem)
        print(f"Copied paper: {paper_json.name}")

    # Copy page images and question images
    for img_dir_name in ("page_images", "question_images", "answer_images"):
        src_dir = PROCESSED / img_dir_name
        if src_dir.exists():
            dst_dir = APP_PROCESSED / img_dir_name
            if dst_dir.exists():
                shutil.rmtree(dst_dir)
            shutil.copytree(src_dir, dst_dir)
            count = sum(1 for _ in dst_dir.rglob("*.png"))
            print(f"Copied {img_dir_name}: {count} image(s)")

    # Regenerate paperStore.ts PAPER_MODULES section
    _update_paper_store(paper_ids)
    print(f"\nSync complete: {len(paper_ids)} paper(s) available in app.")


def _update_paper_store(paper_ids: list[str]):
    if not APP_STORE.exists():
        print("Warning: paperStore.ts not found — skipping auto-update.")
        return

    with open(APP_STORE) as f:
        content = f.read()

    # Build new PAPER_MODULES block
    lines = ["const PAPER_MODULES: Record<string, () => Paper> = {"]
    for pid in paper_ids:
        lines.append(f"  '{pid}': () => require('../../processed_papers/papers/{pid}.json'),")
    lines.append("};")
    new_block = "\n".join(lines)

    # Replace existing block
    import re
    pattern = r"const PAPER_MODULES:.*?\};"
    updated = re.sub(pattern, new_block, content, flags=re.DOTALL)

    if updated != content:
        with open(APP_STORE, "w") as f:
            f.write(updated)
        print(f"Updated paperStore.ts with {len(paper_ids)} paper(s).")
    else:
        print("paperStore.ts unchanged.")


if __name__ == "__main__":
    sync()
