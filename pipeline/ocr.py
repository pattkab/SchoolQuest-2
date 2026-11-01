"""
OCR extraction — convert PDF pages to text, save per-page raw OCR and page images.

Priority: native PyMuPDF text extraction (handles multi-column layouts correctly).
Fallback: Tesseract OCR (for scanned/image-only PDFs).
"""

import io
import json
import os
import re
from pathlib import Path
from typing import Optional

import pymupdf
import pytesseract
from PIL import Image

PROCESSED_DIR = Path(__file__).parent.parent / "processed_papers"
RAW_OCR_DIR = PROCESSED_DIR / "raw_ocr"

# Minimum meaningful characters to consider a page as having native text
NATIVE_MIN_CHARS = 40


def pdf_to_images(pdf_path: Path, dpi: int = 300) -> list[Image.Image]:
    doc = pymupdf.open(str(pdf_path))
    images = []
    for page in doc:
        pix = page.get_pixmap(dpi=dpi)
        img = Image.open(io.BytesIO(pix.tobytes("png")))
        images.append(img)
    doc.close()
    return images


def native_extract_page(page: "pymupdf.Page", page_num: int) -> Optional[dict]:
    """
    Extract text from a page that has embedded text (not a scan).
    Returns None if page has insufficient native text.

    Uses sort=True which reads blocks in reading order — correctly handles
    multi-column layouts by processing each column top-to-bottom.
    """
    text = page.get_text("text", sort=True)

    # Strip exam answer fill-lines (dots/underscores used for writing spaces)
    text = re.sub(r"[.…_]{4,}", "", text)
    # Normalize whitespace
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = "\n".join(line.rstrip() for line in text.splitlines())
    text = text.strip()

    # Count meaningful characters (not whitespace/punctuation used as fill)
    meaningful = len(re.sub(r"[\s\.\-_…,]", "", text))
    if meaningful < NATIVE_MIN_CHARS:
        return None  # Too sparse — fall back to Tesseract

    return {
        "pageNumber": page_num,
        "text": text,
        "ocrConfidence": 95.0,
        "needsReview": False,
        "wordData": {},
        "extractionMethod": "native",
    }


def ocr_image(img: Image.Image, page_num: int) -> dict:
    config = "--psm 3 --oem 1"
    try:
        data = pytesseract.image_to_data(img, config=config, output_type=pytesseract.Output.DICT)
        text = pytesseract.image_to_string(img, config=config)

        confidences = [int(c) for c in data["conf"] if int(c) >= 0]
        avg_conf = round(sum(confidences) / len(confidences), 1) if confidences else 0.0

        return {
            "pageNumber": page_num,
            "text": text,
            "ocrConfidence": avg_conf,
            "needsReview": avg_conf < 60,
            "wordData": data,
            "extractionMethod": "tesseract",
        }
    except Exception as e:
        return {
            "pageNumber": page_num,
            "text": "",
            "ocrConfidence": 0.0,
            "needsReview": True,
            "error": str(e),
            "wordData": {},
            "extractionMethod": "tesseract",
        }


def clean_ocr_text(text: str) -> str:
    text = re.sub(r"^[\.\-_]{4,}\s*$", "", text, flags=re.MULTILINE)
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = "\n".join(line.rstrip() for line in text.splitlines())
    return text.strip()


def extract_header_metadata(first_page_text: str) -> dict:
    """Extract exam metadata from the first page text."""
    from discover import detect_subject, detect_level, detect_year

    lines = [l.strip() for l in first_page_text.splitlines() if l.strip()]
    title = ""
    for line in lines[:10]:
        if len(line) > 5 and not re.match(r"^[\d\.\-_]+$", line):
            title = line
            break

    full_text = " ".join(lines[:15])
    return {
        "title": title,
        "subject": detect_subject(full_text),
        "level": detect_level(full_text),
        "year": detect_year(full_text),
        "examBody": "Uganda National Examinations Board" if "uganda national" in full_text.lower() else "",
    }


def ocr_pdf(paper: dict) -> Optional[dict]:
    """
    Extract text from all pages of a PDF.
    Uses native text extraction when available; falls back to Tesseract for scanned pages.
    """
    from image_extractor import save_page_image

    pdf_path = Path(paper["filePath"])
    paper_id = paper["paperId"]

    print(f"\n  OCR: {pdf_path.name}")

    try:
        images = pdf_to_images(pdf_path)
        doc = pymupdf.open(str(pdf_path))
    except Exception as e:
        print(f"    ERROR loading PDF: {e}")
        return None

    ocr_dir = RAW_OCR_DIR / paper_id
    ocr_dir.mkdir(parents=True, exist_ok=True)

    page_results = []
    page_image_paths = {}
    header_meta = {}

    for i, (mupdf_page, img) in enumerate(zip(doc, images), start=1):
        print(f"    Page {i}/{len(images)}...", end=" ", flush=True)

        # Try native text first
        result = native_extract_page(mupdf_page, i)
        if result:
            method = "native"
        else:
            result = ocr_image(img, i)
            method = "ocr"

        result["text"] = clean_ocr_text(result["text"])
        result["pageImage"] = img

        conf_str = "native" if method == "native" else f"conf={result['ocrConfidence']}%"
        review_str = "no" if not result.get("needsReview") else "YES"
        print(f"{conf_str}  review={review_str}", end=" ")

        try:
            img_path = save_page_image(img, paper_id, i)
            page_image_paths[i] = img_path
            print("img=saved", end="")
        except Exception as e:
            print(f"img=FAIL({e})", end="")

        print()

        if i == 1 and result["text"]:
            header_meta = extract_header_metadata(result["text"])

        page_file = ocr_dir / f"page_{i:02d}.txt"
        with open(page_file, "w", encoding="utf-8") as f:
            f.write(result["text"])

        page_results.append(result)

    doc.close()

    confs = [p["ocrConfidence"] for p in page_results if p.get("ocrConfidence", 0) > 0]
    overall_conf = round(sum(confs) / len(confs), 1) if confs else 0.0
    needs_review = any(p.get("needsReview") for p in page_results)

    return {
        "header": header_meta,
        "pages": page_results,
        "overallConfidence": overall_conf,
        "needsReview": needs_review,
        "pageImagePaths": page_image_paths,
    }
