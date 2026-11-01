"""
Visual block detection and image-question linking for SchoolQuest.

Milestones 1–3:
  1. Save full page images as PNG.
  2. Detect visual blocks (diagrams, maps, tables, graphs) on each page.
  3. Link detected images to questions using page position and stimulus phrases.
"""

import re
import uuid
from pathlib import Path
from typing import Optional

from PIL import Image, ImageDraw

PROCESSED_DIR = Path(__file__).parent.parent / "processed_papers"
PAGE_IMAGES_DIR = PROCESSED_DIR / "page_images"
QUESTION_IMAGES_DIR = PROCESSED_DIR / "question_images"

# Minimum pixel area of a visual block (at 300 DPI, ~1cm²)
MIN_BLOCK_AREA = 10_000
# Minimum dimension of a visual block (pixels)
MIN_BLOCK_DIM = 60

# ── Stimulus phrase detection ─────────────────────────────────────────────────

STIMULUS_PATTERNS = [
    (re.compile(r"use\s+it\s+to\s+answer\s+the\s+questions?\s+(below|that\s+follow)", re.I), "picture"),
    (re.compile(r"use\s+the\s+information\s+below", re.I), "passage"),
    (re.compile(r"read\s+the\s+passage\s+below", re.I), "passage"),
    (re.compile(r"answer\s+the\s+questions?\s+that\s+follow", re.I), "passage"),
    (re.compile(r"study\s+the\s+(diagram|map|picture|graph|table|drawing|figure|chart)\s+below", re.I), None),
    (re.compile(r"use\s+the\s+(diagram|map|picture|graph|table|drawing|figure|chart)\s+below", re.I), None),
    (re.compile(r"look\s+at\s+the\s+(diagram|map|picture|graph|table|drawing|figure|chart)", re.I), None),
    (re.compile(r"the\s+(diagram|map|picture|graph|table|drawing|figure|chart)\s+(below|shows|above)", re.I), None),
    (re.compile(r"refer\s+to\s+the\s+(diagram|map|picture|graph|table|drawing|figure|chart)", re.I), None),
    (re.compile(r"(diagram|map|picture|graph|table|drawing|figure|chart)\s+below\s+shows", re.I), None),
    (re.compile(r"the\s+picture\s+below", re.I), "picture"),
    (re.compile(r"study\s+the\s+(picture|map|diagram)\s+carefully", re.I), None),
    (re.compile(r"labelled?\s+(diagram|map|figure|drawing)", re.I), None),
    (re.compile(r"answer\s+questions?.+using\s+the\s+(diagram|map|picture|graph|table|figure|chart|passage)", re.I), None),
    (re.compile(r"questions?\s+\d+\s+(?:to|-|and)\s+\d+.{0,20}(diagram|map|picture|graph|table|figure)", re.I), None),
    (re.compile(r"for\s+questions?\s+\d+\s+(?:to|-|and)\s+\d+", re.I), None),
]

SHARED_STIMULUS_RE = re.compile(
    r"(?:answer|use|for)\s+questions?\s+(\d+)\s+(?:to|-|and)\s+(\d+)", re.I
)


def detect_stimulus_phrases(text: str) -> dict:
    """
    Scan OCR text for phrases indicating an associated image.

    Returns:
        hasStimulus  – bool
        phrase       – matched text or None
        stimulusType – 'diagram' | 'map' | 'table' | 'graph' | 'picture' | None
        isShared     – True if the image is shared across several questions
        qRange       – [first_q_num, last_q_num] if shared, else None
    """
    result: dict = {
        "hasStimulus": False,
        "phrase": None,
        "stimulusType": None,
        "isShared": False,
        "qRange": None,
    }

    for pat, forced_type in STIMULUS_PATTERNS:
        m = pat.search(text)
        if m:
            result["hasStimulus"] = True
            result["phrase"] = m.group(0)
            if forced_type:
                result["stimulusType"] = forced_type
            else:
                groups = [g for g in m.groups() if g]
                if groups:
                    result["stimulusType"] = groups[0].lower()
            break

    sm = SHARED_STIMULUS_RE.search(text)
    if sm:
        result["isShared"] = True
        result["hasStimulus"] = True
        nums = [int(sm.group(1)), int(sm.group(2))]
        result["qRange"] = [min(nums), max(nums)]

    return result


# ── Page image saving ─────────────────────────────────────────────────────────

def save_page_image(page_img: Image.Image, paper_id: str, page_num: int) -> str:
    """Save a page image and return its absolute path."""
    out_dir = PAGE_IMAGES_DIR / paper_id
    out_dir.mkdir(parents=True, exist_ok=True)
    path = out_dir / f"page_{page_num:02d}.png"
    # Save at reasonable quality; original 300 DPI is maintained
    page_img.save(str(path), "PNG", optimize=True)
    return str(path)


# ── Visual block detection ────────────────────────────────────────────────────

def _find_visual_regions(
    page_img: Image.Image,
    word_data: dict,
    min_area: int = MIN_BLOCK_AREA,
    min_dim: int = MIN_BLOCK_DIM,
) -> list:
    """
    Detect large non-text ink regions on a page using numpy array analysis.

    Returns list of (x, y, w, h) tuples (pixel coords at page image resolution).
    Falls back to empty list if numpy is unavailable.
    """
    try:
        import numpy as np
    except ImportError:
        return []

    gray = page_img.convert("L")
    arr = np.array(gray)
    h, w = arr.shape

    # Binary: True = ink (dark pixel below threshold)
    ink = arr < 180

    # Build text mask from Tesseract word bounding boxes
    text_mask = np.zeros((h, w), dtype=bool)
    confs = word_data.get("conf", [])
    for i in range(len(confs)):
        if int(confs[i]) < 0:
            continue
        bx = int(word_data["left"][i])
        by = int(word_data["top"][i])
        bw = int(word_data["width"][i])
        bh = int(word_data["height"][i])
        if bw <= 0 or bh <= 0:
            continue
        pad = 14
        r0, r1 = max(0, by - pad), min(h, by + bh + pad)
        c0, c1 = max(0, bx - pad), min(w, bx + bw + pad)
        text_mask[r0:r1, c0:c1] = True

    # Non-text ink: ink pixels not covered by text
    visual = ink & ~text_mask

    # Row density: fraction of pixels in each row that are non-text ink
    row_density = visual.mean(axis=1)

    # Find rows with >2% non-text ink
    threshold = 0.02
    active = row_density > threshold

    # Find contiguous bands of active rows
    bands: list = []
    in_band = False
    band_start = 0
    gap_count = 0
    MAX_GAP = 25  # allow up to 25 inactive rows within a visual block

    for row in range(h):
        if active[row]:
            if not in_band:
                band_start = row
                in_band = True
            gap_count = 0
        else:
            if in_band:
                gap_count += 1
                if gap_count > MAX_GAP:
                    # End of band
                    bands.append((band_start, row - gap_count))
                    in_band = False
                    gap_count = 0

    if in_band:
        bands.append((band_start, h))

    # Merge bands that are close together (within 40 rows)
    merged: list = []
    for y0, y1 in bands:
        if merged and y0 - merged[-1][1] < 40:
            merged[-1] = (merged[-1][0], y1)
        else:
            merged.append([y0, y1])

    regions: list = []
    for y0, y1 in merged:
        band_visual = visual[y0:y1, :]
        col_any = band_visual.any(axis=0)
        cols = np.where(col_any)[0]
        if len(cols) == 0:
            continue
        x0, x1 = int(cols[0]), int(cols[-1]) + 1
        band_h = y1 - y0
        band_w = x1 - x0

        if band_h * band_w < min_area:
            continue
        if band_h < min_dim or band_w < min_dim:
            continue

        regions.append((x0, y0, band_w, band_h))

    return regions


def extract_visual_blocks(
    page_img: Image.Image,
    word_data: dict,
    paper_id: str,
    page_num: int,
) -> list:
    """
    Detect visual blocks on a page, save each as a cropped image file.

    Returns list of block metadata dicts with image paths and bounding boxes.
    """
    regions = _find_visual_regions(page_img, word_data)
    if not regions:
        return []

    out_dir = QUESTION_IMAGES_DIR / paper_id
    out_dir.mkdir(parents=True, exist_ok=True)

    blocks = []
    for idx, (x, y, bw, bh) in enumerate(regions, start=1):
        # Add small margin around the crop
        margin = 8
        img_w, img_h = page_img.size
        crop_box = (
            max(0, x - margin),
            max(0, y - margin),
            min(img_w, x + bw + margin),
            min(img_h, y + bh + margin),
        )
        cropped = page_img.crop(crop_box)

        filename = f"page_{page_num:02d}_block_{idx:02d}.png"
        path = out_dir / filename
        cropped.save(str(path), "PNG", optimize=True)

        blocks.append({
            "imageId": str(uuid.uuid4()),
            "type": "question_image",
            "sourcePage": page_num,
            "localPath": str(path),
            "remoteUrl": None,
            "caption": "",
            "altText": f"Visual block on page {page_num}",
            "bbox": {
                "x": x,
                "y": y,
                "width": bw,
                "height": bh,
            },
            "imageStatus": "image_extracted",
            "needsReview": True,  # always start as needs review; admin confirms
        })

    return blocks


# ── Image-question linking ────────────────────────────────────────────────────

def link_images_to_questions(
    questions: list,
    page_blocks: dict,   # page_num → list of block dicts
    page_heights: dict,  # page_num → image height in pixels (for Y-position fractions)
    page_image_paths: Optional[dict] = None,
) -> list:
    """
    Associate extracted visual blocks with questions.

    Strategy:
    1. If a question's text contains a stimulus phrase → link first unlinked
       block on the same page (needsReview=False if matched by phrase).
    2. If a block is on a page with exactly one question → link with needsReview=True.
    3. Remaining unlinked blocks on pages with multiple questions →
       link to the question closest above by page order (needsReview=True).
    4. If a question's stimulus phrase mentions a shared range → mark as
       sharedStimulus and link to all questions in that range.

    Returns the questions list with `images` field populated.
    """
    # Index questions by page
    page_to_questions: dict = {}
    for q in questions:
        pn = q.get("pageNumber", 1)
        page_to_questions.setdefault(pn, []).append(q)

    used_blocks: set = set()  # imageIds already linked

    # Pass 1: stimulus-phrase matching
    for q in questions:
        stimulus = q.get("_stimulus", {})
        if not stimulus.get("hasStimulus"):
            continue
        pn = q.get("pageNumber", 1)
        blocks = page_blocks.get(pn, [])
        for block in blocks:
            if block["imageId"] in used_blocks:
                continue
            img = dict(block)
            img["needsReview"] = False
            img["altText"] = f"{stimulus.get('stimulusType', 'image').title()} for Q{q['questionNumber']}"
            q.setdefault("images", []).append(img)
            used_blocks.add(block["imageId"])
            break  # one block per question in pass 1

    # Handle shared stimuli: if isShared and qRange, link to all questions in range
    shared_stimuli: list = []
    for q in questions:
        stimulus = q.get("_stimulus", {})
        if not (stimulus.get("isShared") and stimulus.get("qRange")):
            continue
        if q.get("images"):
            q_img = q["images"][0]
            q_range = stimulus["qRange"]
            stimulus_entry = {
                "sharedStimulusId": str(uuid.uuid4()),
                "type": stimulus.get("stimulusType") or "image",
                "title": f"Shared image for questions {q_range[0]}–{q_range[1]}",
                "imagePath": q_img.get("localPath", ""),
                "linkedQuestionIds": [],
                "needsReview": False,
            }
            # Link to all questions in range
            for other_q in questions:
                try:
                    num = int(re.match(r"\d+", other_q["questionNumber"]).group())
                    if q_range[0] <= num <= q_range[1]:
                        stimulus_entry["linkedQuestionIds"].append(other_q["questionId"])
                        if other_q["questionId"] != q["questionId"]:
                            other_q.setdefault("images", []).append(dict(q_img))
                except (ValueError, AttributeError):
                    pass
            shared_stimuli.append(stimulus_entry)

    # Pass 2: one block on page → link to whatever question is there
    for pn, blocks in page_blocks.items():
        pn_questions = page_to_questions.get(pn, [])
        if len(pn_questions) == 1:
            q = pn_questions[0]
            for block in blocks:
                if block["imageId"] in used_blocks:
                    continue
                img = dict(block)
                img["needsReview"] = True
                q.setdefault("images", []).append(img)
                used_blocks.add(block["imageId"])

    # Pass 3: remaining unlinked blocks → attach to last question on that page
    for pn, blocks in page_blocks.items():
        pn_questions = page_to_questions.get(pn, [])
        if not pn_questions:
            continue
        last_q = pn_questions[-1]  # simplistic: assign to last question on page
        for block in blocks:
            if block["imageId"] in used_blocks:
                continue
            img = dict(block)
            img["needsReview"] = True
            last_q.setdefault("images", []).append(img)
            used_blocks.add(block["imageId"])

    # Build one shared-stimulus record for every stimulus parent. If crop
    # detection failed, preserve the original full page as a reviewable fallback.
    normalized_stimuli: list = []
    page_image_paths = page_image_paths or {}
    for q in questions:
        stimulus = q.get("_stimulus", {})
        if not stimulus.get("hasStimulus"):
            continue
        image = q.get("images", [None])[0] if q.get("images") else None
        fallback = not bool(image)
        local_path = image.get("localPath") if image else page_image_paths.get(q.get("pageNumber"))
        linked_ids = [s["questionId"] for s in q.get("subQuestions", [])] or [q["questionId"]]
        stimulus_type = stimulus.get("stimulusType") or "picture"
        normalized_stimuli.append({
            "stimulusId": f"stimulus_{q['questionId']}",
            "paperId": q["paperId"],
            "parentQuestionId": q["questionId"],
            "type": "table_image" if stimulus_type == "table" else ("full_page" if fallback else stimulus_type),
            "title": f"{stimulus_type.title()} for Question {q['questionNumber']}",
            "instructionText": q.get("questionText", ""),
            "localPath": local_path,
            "remoteUrl": image.get("remoteUrl") if image else None,
            "structuredTable": None,
            "sourcePage": q.get("pageNumber", 0),
            "bbox": image.get("bbox") if image else None,
            "linkedQuizItemIds": linked_ids,
            "status": "needs_review" if fallback or (image and image.get("needsReview")) else "linked",
            "needsReview": fallback or bool(image and image.get("needsReview")),
            "reviewNotes": "Crop detection failed; using full page image." if fallback else "",
            "caption": image.get("caption", "") if image else f"Original page {q.get('pageNumber')}",
            "altText": image.get("altText", "") if image else f"Original page containing Question {q['questionNumber']}",
        })

    # Clean up internal _stimulus field
    for q in questions:
        q.pop("_stimulus", None)
        q.setdefault("images", [])
        for sq in q.get("subQuestions", []):
            sq.setdefault("images", [])

    return questions, normalized_stimuli
