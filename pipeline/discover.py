"""
Milestone 1: Discover and index all PDF files in the past papers folder.

Directory convention: past papers/<Subject>/<Level>/<filename>.pdf
  e.g.  past papers/Science/P7/P.7 SCIENCE PLE SET 1.pdf
        past papers/Mixed Papers/P4/P.4 HOLIDAY PACKAGE.pdf

IDs are based on the relative path within past papers/ so they survive
reorganisation.  Moving a file is detected by stem matching while checking
the original path still exists (so exact duplicates are skipped, not migrated).
"""

import json
import re
import hashlib
from pathlib import Path
from datetime import datetime

PAST_PAPERS_DIR = Path(__file__).parent.parent / "past papers"
PROCESSED_DIR   = Path(__file__).parent.parent / "processed_papers"
INDEX_FILE       = PROCESSED_DIR / "index.json"

SUBJECT_DIR_MAP = {
    "science": "Science",
    "mathematics": "Mathematics",
    "maths": "Mathematics",
    "math": "Mathematics",
    "english": "English",
    "sst": "SST",
    "social studies": "SST",
    "religious education": "Religious Education",
    "ire": "Religious Education",
    "cre": "Religious Education",
    "mixed papers": "Mixed",
    "mixed": "Mixed",
}

LEVEL_DIR_MAP = {
    "p7": "Primary 7", "p6": "Primary 6", "p5": "Primary 5",
    "p4": "Primary 4", "p3": "Primary 3", "p2": "Primary 2", "p1": "Primary 1",
}

SUBJECT_KEYWORDS = {
    "Science":             ["science", "integrated science"],
    "Mathematics":         ["math", "mathematics", "maths"],
    "English":             ["english", "language", "literacy"],
    "SST":                 ["sst", "social studies", "social science"],
    "Religious Education": ["religious", "ire", "cre", "mre", "religion"],
}

LEVEL_PATTERNS = [
    (r"p\.?\s*7|primary\s*7|p7|ple|primary\s*leaving", "Primary 7"),
    (r"p\.?\s*6|primary\s*6|p6",                        "Primary 6"),
    (r"p\.?\s*5|primary\s*5|p5",                        "Primary 5"),
    (r"p\.?\s*4|primary\s*4|p4",                        "Primary 4"),
    (r"p\.?\s*3|primary\s*3|p3",                        "Primary 3"),
    (r"p\.?\s*2|primary\s*2|p2",                        "Primary 2"),
    (r"p\.?\s*1|primary\s*1|p1",                        "Primary 1"),
]

YEAR_PATTERN = re.compile(r"\b(19|20)\d{2}\b")


def _subject_from_dir(rel: Path) -> str:
    if len(rel.parts) >= 2:
        return SUBJECT_DIR_MAP.get(rel.parts[0].lower().strip(), rel.parts[0].strip())
    return ""


def _level_from_dir(rel: Path) -> str:
    if len(rel.parts) >= 3:
        return LEVEL_DIR_MAP.get(rel.parts[1].lower().strip(), "")
    return ""


def detect_subject(text: str) -> str:
    lower = text.lower()
    for subject, keywords in SUBJECT_KEYWORDS.items():
        for kw in keywords:
            if kw in lower:
                return subject
    return ""


def detect_level(text: str) -> str:
    lower = text.lower()
    for pattern, level in LEVEL_PATTERNS:
        if re.search(pattern, lower):
            return level
    return ""


def detect_year(text: str) -> str:
    match = YEAR_PATTERN.search(text)
    return match.group(0) if match else ""


def file_id(rel: Path) -> str:
    """Stable ID based on relative path within PAST_PAPERS_DIR."""
    h    = hashlib.md5(str(rel).encode()).hexdigest()[:8]
    stem = re.sub(r"[^a-z0-9]", "_", rel.stem.lower())[:40]
    return f"{stem}_{h}"


def get_page_count(pdf_path: Path) -> int:
    try:
        import pymupdf
        doc   = pymupdf.open(str(pdf_path))
        count = len(doc)
        doc.close()
        return count
    except Exception:
        return -1


def discover_pdfs() -> "list[dict]":
    results = []
    for pdf_path in sorted(PAST_PAPERS_DIR.rglob("*.pdf")):
        rel      = pdf_path.relative_to(PAST_PAPERS_DIR)
        paper_id = file_id(rel)

        subject = _subject_from_dir(rel) or detect_subject(pdf_path.name)
        level   = _level_from_dir(rel)   or detect_level(pdf_path.name)
        year    = detect_year(pdf_path.name)
        pages   = get_page_count(pdf_path)

        entry = {
            "paperId":       paper_id,
            "fileName":      pdf_path.name,
            "filePath":      str(pdf_path),
            "relativePath":  str(rel),
            "fileSizeBytes": pdf_path.stat().st_size,
            "pages":         pages,
            "subject":       subject,
            "level":         level,
            "year":          year,
            "term":          "",
            "title":         pdf_path.stem,
            "status":        "not_started",
            "discoveredAt":  datetime.utcnow().isoformat() + "Z",
            "processedAt":   None,
            "error":         None,
        }
        results.append(entry)
        print(f"  Found: {rel}  [subject={subject or '?'}, level={level or '?'}, year={year or '?'}, pages={pages}]")

    return results


def load_index() -> dict:
    if INDEX_FILE.exists():
        with open(INDEX_FILE) as f:
            return json.load(f)
    return {"updatedAt": None, "papers": []}


def save_index(index: dict):
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    index["updatedAt"] = datetime.utcnow().isoformat() + "Z"
    with open(INDEX_FILE, "w") as f:
        json.dump(index, f, indent=2)
    print(f"\nIndex saved: {INDEX_FILE}")


def run_discovery():
    print(f"Scanning: {PAST_PAPERS_DIR}\n")
    new_papers = discover_pdfs()

    index        = load_index()
    existing_ids = {p["paperId"] for p in index["papers"]}

    # Stem map to detect files that moved (original path no longer exists)
    existing_by_stem: dict = {}
    for p in index["papers"]:
        stem = Path(p["filePath"]).stem.lower()
        existing_by_stem[stem] = p

    added = updated = skipped = 0
    for paper in new_papers:
        stem = Path(paper["filePath"]).stem.lower()

        if paper["paperId"] in existing_ids:
            # Same relative path — update metadata, preserve status
            for existing in index["papers"]:
                if existing["paperId"] == paper["paperId"]:
                    existing.update({k: paper[k] for k in
                        ("filePath", "relativePath", "fileSizeBytes", "pages")})
                    for k in ("subject", "level", "year"):
                        existing[k] = paper[k] or existing.get(k, "")
                    break
            updated += 1

        elif stem in existing_by_stem:
            existing = existing_by_stem[stem]
            old_path = Path(existing["filePath"])

            if old_path.exists():
                # Original file still on disk → this is a duplicate copy; skip
                print(f"  → Skipping duplicate: {paper['relativePath']} (original still at {existing.get('relativePath', old_path.name)})")
                skipped += 1
            else:
                # Original gone → file moved; preserve ID and processed status
                print(f"  → Migrated: {existing['paperId']}  → {paper['relativePath']}")
                existing.update({k: paper[k] for k in
                    ("filePath", "relativePath", "fileSizeBytes", "pages")})
                for k in ("subject", "level"):
                    existing[k] = paper[k] or existing.get(k, "")
                updated += 1

        else:
            index["papers"].append(paper)
            added += 1

    save_index(index)
    print(f"\nDiscovery complete: {len(new_papers)} PDFs found, {added} newly added, {updated} updated, {skipped} duplicates skipped.")
    return index


if __name__ == "__main__":
    run_discovery()
