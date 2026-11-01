#!/usr/bin/env python3
"""Build the curated digital version of the uploaded P4 Set 3 maths paper.

The source PDF was visually checked page-by-page. Several embedded Word objects
are absent from the PDF itself; those items are retained but marked for manual
review instead of inventing a diagram or answer.
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
PROCESSED = ROOT / "processed_papers"
PAPER_ID = "p4_holiday_set_3_maths_25fbf457"
SOURCE = Path("/Users/patt/Desktop/P4 Holiday package .pdf")


def q(
    number: str,
    text: str,
    answer: str | None,
    marks: int,
    page: int,
    *,
    section: str,
    qtype: str = "calculation",
    accepted: list[str] | None = None,
    options: list[tuple[str, str]] | None = None,
    guide: str | None = None,
    review: str = "",
    stimulus: str | None = None,
) -> dict:
    question_id = f"{PAPER_ID}_q_{number.replace('(', '_').replace(')', '').replace(' ', '_')}"
    option_list = [{"label": label, "text": label_text} for label, label_text in (options or [])]
    needs_review = bool(review)
    answer_type = "multiple_choice" if option_list else "manual" if answer is None else "text"
    images = []
    if needs_review:
        images = [{
            "imageId": f"{question_id}_source_page",
            "type": "question_image",
            "sourcePage": page,
            "localPath": f"bundled://{PAPER_ID}/page_{page:02d}.png",
            "remoteUrl": None,
            "caption": f"Original uploaded PDF - page {page}",
            "altText": f"Original source page {page} for question {number}",
            "bbox": None,
            "imageStatus": "needs_review",
            "needsReview": True,
        }]
    return {
        "questionId": question_id,
        "paperId": PAPER_ID,
        "questionNumber": number,
        "section": section,
        "subject": "Mathematics",
        "questionText": text,
        "questionType": qtype,
        "options": option_list,
        "correctAnswer": answer,
        "markingGuide": guide,
        "marks": marks,
        "pageNumber": page,
        "images": images,
        "hasStimulus": stimulus is not None,
        "stimulusPhrase": stimulus,
        "stimulusType": "structured_table" if stimulus else None,
        "subQuestions": [],
        "ocrConfidence": 95.0 if not needs_review else 50.0,
        "needsReview": needs_review,
        "reviewNotes": review,
        "quizItemId": question_id,
        "parentQuestionId": None,
        "parentInstruction": None,
        "displayNumber": number,
        "prompt": text,
        "answerType": answer_type,
        "studentInputType": "choice" if option_list else "image_or_text",
        "linkedStimulusIds": [stimulus] if stimulus else [],
        "acceptedAnswers": accepted or [],
    }


SECTION_A = "Section A"
SECTION_B = "Section B"
SOURCE_MISSING = (
    "The visual or equation is missing from the supplied PDF itself. "
    "Keep this item for teacher review and do not auto-mark it."
)


questions = [
    q("1", "Add 42 + 37.", "79", 2, 3, section=SECTION_A, guide="Add ones, then tens."),
    q("2", "Write 112 in words.", "one hundred and twelve", 2, 3, section=SECTION_A,
      qtype="short_answer", accepted=["one hundred twelve"]),
    q("3", "Which region should be shaded to represent P intersection Q?", "C", 2, 3,
      section=SECTION_A, qtype="multiple_choice",
      options=[("A", "Only the part of P outside Q"), ("B", "Only the part of Q outside P"),
               ("C", "The overlapping part of P and Q"), ("D", "Everything outside P and Q")],
      guide="P intersection Q means elements shared by both sets."),
    q("4", "Find the next number: 3, 6, 9, 12, ___.", "15", 2, 3, section=SECTION_A),
    q("5", "A book costs Shs. 500. How much do 3 similar books cost?", "1500", 2, 3,
      section=SECTION_A, guide="500 x 3 = 1,500 shillings."),
    q("6", "Count the number of rectangles in the source diagram.", None, 2, 3,
      section=SECTION_A, qtype="unknown", review=SOURCE_MISSING),
    q("7", "Add the numbers shown in the source equation.", None, 2, 3,
      section=SECTION_A, qtype="unknown", review=SOURCE_MISSING),
    q("8", "Use the flower key in the source picture to find the number of flowers represented.", None, 2, 3,
      section=SECTION_A, qtype="unknown", review=SOURCE_MISSING),
    q("9", "Tell the time shown on the source clock.", None, 2, 4,
      section=SECTION_A, qtype="unknown", review=SOURCE_MISSING),
    q("10", "Find the missing number: ___ + 3 = 9.", "6", 2, 4, section=SECTION_A),
    q("11", "Draw a cone.", None, 2, 4, section=SECTION_A,
      qtype="drawing_or_diagram", guide="Award marks for a recognisable cone with a circular base."),
    q("12", "A figure has side lengths 7 cm, 8 cm and 10 cm. Find the distance around it.", "25", 2, 4,
      section=SECTION_A, accepted=["25 cm"], guide="Perimeter = 7 + 8 + 10 = 25 cm."),
    q("13", "Show 4106 on an abacus. Enter the Thousands, Hundreds, Tens and Ones digits in that order.",
      "4, 1, 0, 6", 2, 4, section=SECTION_A, qtype="short_answer",
      accepted=["4 1 0 6", "4106"], guide="TH=4, H=1, T=0, O=6."),
    q("14", "Share 36 mangoes equally among 3 boys. How many does each boy get?", "12", 2, 5,
      section=SECTION_A),
    q("15", "What fraction is represented when 3 of 5 equal parts are shaded?", "3/5", 2, 5,
      section=SECTION_A, qtype="short_answer", accepted=["three fifths", "3 out of 5"]),
    q("16", "Use a number line to add 5 + 2.", "7", 2, 5, section=SECTION_A),
    q("17", "Given P = {days of the week}, find n(P).", "7", 2, 5, section=SECTION_A),
    q("18", "What is two-thirds of 18 balls?", "12", 2, 5, section=SECTION_A),
    q("19", "Write 19 in Roman numerals.", "XIX", 2, 5, section=SECTION_A,
      qtype="short_answer"),
    q("20", "Complete: 3 + 3 + 3 + 3 = ___ x ___ = ___.", "4 x 3 = 12", 2, 6,
      section=SECTION_A, qtype="short_answer",
      accepted=["4 × 3 = 12", "4*3=12", "4x3=12"]),

    q("21(a)(i)", "Name shape (i) shown in the source.", None, 1, 6, section=SECTION_B,
      qtype="unknown", review=SOURCE_MISSING),
    q("21(a)(ii)", "Name shape (ii) shown in the source.", None, 1, 6, section=SECTION_B,
      qtype="unknown", review=SOURCE_MISSING),
    q("21(b)(i)", "Draw a triangle.", None, 1, 6, section=SECTION_B,
      qtype="drawing_or_diagram", guide="Award one mark for a closed three-sided shape."),
    q("21(b)(ii)", "Draw a square.", None, 1, 6, section=SECTION_B,
      qtype="drawing_or_diagram", guide="Award one mark for a closed four-equal-sided square."),

    q("22(a)", "List the elements of set R.", "{0, 2, 4, 6, 8}", 1, 6, section=SECTION_B,
      qtype="short_answer", accepted=["0,2,4,6,8", "0 2 4 6 8"], stimulus="stimulus_q22"),
    q("22(b)", "List the members of set S.", "{1, 2, 3, 4, 5, 6}", 1, 7, section=SECTION_B,
      qtype="short_answer", accepted=["1,2,3,4,5,6", "1 2 3 4 5 6"], stimulus="stimulus_q22"),
    q("22(c)(i)", "Find R intersection S.", "{2, 4, 6}", 1, 7, section=SECTION_B,
      qtype="short_answer", accepted=["2,4,6", "2 4 6"], stimulus="stimulus_q22"),
    q("22(c)(ii)", "Find R union S.", "{0, 1, 2, 3, 4, 5, 6, 8}", 1, 7, section=SECTION_B,
      qtype="short_answer", accepted=["0,1,2,3,4,5,6,8", "0 1 2 3 4 5 6 8"], stimulus="stimulus_q22"),
    q("22(c)(iii)", "Find n(R intersection S).", "3", 1, 7, section=SECTION_B,
      stimulus="stimulus_q22"),

    q("23(a)", "Find the magic sum.", "15", 1, 7, section=SECTION_B, stimulus="stimulus_q23"),
    q("23(b)(i)", "Find x in the magic square.", "8", 1, 7, section=SECTION_B, stimulus="stimulus_q23"),
    q("23(b)(ii)", "Find y in the magic square.", "7", 1, 8, section=SECTION_B, stimulus="stimulus_q23"),
    q("23(b)(iii)", "Find z in the magic square.", "9", 1, 8, section=SECTION_B, stimulus="stimulus_q23"),

    q("24(a)", "Find the missing number: ___ + 6 = 9.", "3", 1, 8, section=SECTION_B),
    q("24(b)", "Find the missing number: ___ - 7 = 13.", "20", 1, 8, section=SECTION_B),
    q("24(c)", "Find the missing number: 32 / ___ = 8.", "4", 1, 8, section=SECTION_B),
    q("24(d)", "Find the missing number: 7 x ___ = 35.", "5", 1, 8, section=SECTION_B),

    q("25(a)", "Kakeeto ate one-quarter of a cake. What fraction remained?", "3/4", 2, 9,
      section=SECTION_B, qtype="short_answer", accepted=["three quarters", "three-quarters"]),
    q("25(b)", "Work out 7/8 - 5/8.", "1/4", 1, 9, section=SECTION_B,
      qtype="short_answer", accepted=["2/8", "one quarter", "two eighths"]),
    q("25(c)", "How many half-litre cups of water will fill a 5-litre bucket?", "10", 2, 9,
      section=SECTION_B),

    q("26(a)", "Use a number line to work out 6 + 3.", "9", 2, 9, section=SECTION_B),
    q("26(b)", "Use a number line to work out 8 - 4.", "4", 2, 9, section=SECTION_B),
    q("26(c)", "Use a number line to work out 3 x 2.", "6", 2, 10, section=SECTION_B),

    q("27(a)", "A square has side length 5 cm. Name the figure.", "square", 1, 10,
      section=SECTION_B, qtype="short_answer", stimulus="stimulus_q27"),
    q("27(b)", "Calculate the area of a square with side length 5 cm.", "25", 2, 10,
      section=SECTION_B, accepted=["25 cm2", "25 cm^2", "25 square centimetres"],
      guide="Area = side x side = 5 x 5 = 25 cm2.", stimulus="stimulus_q27"),
    q("27(c)", "Find the perimeter of a square with side length 5 cm.", "20", 2, 10,
      section=SECTION_B, accepted=["20 cm"], guide="Perimeter = 4 x 5 = 20 cm.", stimulus="stimulus_q27"),

    q("28(a)", "How many days are in 2 weeks?", "14", 1, 10, section=SECTION_B,
      stimulus="stimulus_q28"),
    q("28(b)", "How many weeks are 28 days?", "4", 1, 10, section=SECTION_B,
      stimulus="stimulus_q28"),
    q("28(c)", "How many weeks are 35 days?", "5", 1, 10, section=SECTION_B,
      stimulus="stimulus_q28"),
    q("28(d)", "How many days are in 3 weeks?", "21", 1, 10, section=SECTION_B,
      stimulus="stimulus_q28"),

    q("29(a)", "Find the total cost of 2 packets of salt.", "2000", 2, 11, section=SECTION_B,
      guide="Shs. 1,000 x 2 = Shs. 2,000.", stimulus="stimulus_q29"),
    q("29(b)", "How much will Peter pay for 3 litres of milk?", "6000", 2, 11, section=SECTION_B,
      guide="Shs. 2,000 x 3 = Shs. 6,000.", stimulus="stimulus_q29"),
    q("29(c)", "Find the total cost of one of each item in the price list.", "6800", 2, 11,
      section=SECTION_B, guide="1,800 + 2,000 + 1,000 + 2,000 = 6,800.", stimulus="stimulus_q29"),

    q("30(i)", "Choose the correct sign: 1 + 2 ___ 3 + 0.", "=", 1, 11, section=SECTION_B,
      qtype="multiple_choice", options=[("<", "less than"), ("=", "equal to"), (">", "greater than")]),
    q("30(ii)", "Choose the correct sign: 107 ___ 170.", "<", 1, 11, section=SECTION_B,
      qtype="multiple_choice", options=[("<", "less than"), ("=", "equal to"), (">", "greater than")]),
    q("30(iii)", "Choose the correct sign: 1/2 ___ 1/4.", ">", 1, 12, section=SECTION_B,
      qtype="multiple_choice", options=[("<", "less than"), ("=", "equal to"), (">", "greater than")]),
    q("30(iv)", "Choose the correct sign: IV ___ VI.", "<", 1, 12, section=SECTION_B,
      qtype="multiple_choice", options=[("<", "less than"), ("=", "equal to"), (">", "greater than")]),
    q("30(v)", "Choose the correct sign: 3 x 10 ___ 10 x 3.", "=", 1, 12, section=SECTION_B,
      qtype="multiple_choice", options=[("<", "less than"), ("=", "equal to"), (">", "greater than")]),

    q("31(a)", "Shamsa is 16. Aisha is 4 years younger. Find Aisha's age.", "12", 2, 12,
      section=SECTION_B),
    q("31(b)", "Shamsa is 16 and Aisha is 12. Find their total age.", "28", 2, 12,
      section=SECTION_B),
    q("31(c)", "Aisha is 12. Find her age after 10 years.", "22", 2, 12,
      section=SECTION_B),

    q("32(a)", "How many pupils attended school on Thursday in the source graph?", None, 1, 13,
      section=SECTION_B, qtype="unknown", review=SOURCE_MISSING, stimulus="stimulus_q32"),
    q("32(b)", "On which two days was attendance the same in the source graph?", None, 2, 13,
      section=SECTION_B, qtype="unknown", review=SOURCE_MISSING, stimulus="stimulus_q32"),
    q("32(c)", "On which day was attendance highest in the source graph?", None, 1, 14,
      section=SECTION_B, qtype="unknown", review=SOURCE_MISSING, stimulus="stimulus_q32"),
    q("32(d)", "How many pupils attended on Monday, Wednesday and Friday altogether?", None, 2, 14,
      section=SECTION_B, qtype="unknown", review=SOURCE_MISSING, stimulus="stimulus_q32"),
]


def stimulus(stimulus_id: str, title: str, instruction: str, linked: list[str], *, table=None, page: int) -> dict:
    return {
        "stimulusId": stimulus_id,
        "paperId": PAPER_ID,
        "parentQuestionId": "",
        "type": "structured_table" if table else "passage",
        "title": title,
        "instructionText": instruction,
        "localPath": None,
        "remoteUrl": None,
        "structuredTable": table,
        "sourcePage": page,
        "bbox": None,
        "linkedQuizItemIds": linked,
        "status": "published",
        "needsReview": False,
        "reviewNotes": "",
        "caption": "",
        "altText": title,
    }


def ids(prefix: str) -> list[str]:
    return [item["questionId"] for item in questions if item["questionNumber"].startswith(prefix)]


stimuli = [
    stimulus("stimulus_q22", "Venn diagram data",
             "The source positions the numbers as follows: R only has 0 and 8; the overlap has 2, 4 and 6; S only has 1, 3 and 5.",
             ids("22"), page=6,
             table={"columns": ["Region", "Elements"], "rows": [["R only", "0, 8"], ["R and S", "2, 4, 6"], ["S only", "1, 3, 5"]]}),
    stimulus("stimulus_q23", "Magic square", "Every row, column and diagonal has the same total.",
             ids("23"), page=7,
             table={"columns": ["Column 1", "Column 2", "Column 3"], "rows": [["x", "1", "6"], ["3", "5", "y"], ["4", "z", "2"]]}),
    stimulus("stimulus_q27", "Square with side 5 cm", "Use a square whose side length is 5 cm.", ids("27"), page=10),
    stimulus("stimulus_q28", "Weeks and days", "Complete the equivalent weeks and days.", ids("28"), page=10,
             table={"columns": ["Measure", "A", "B", "C", "D", "E"], "rows": [["Weeks", "1", "2", "?", "?", "3"], ["Days", "7", "?", "28", "35", "?"]]}),
    stimulus("stimulus_q29", "Price list", "Use the prices below.", ids("29"), page=11,
             table={"columns": ["Item", "Price"], "rows": [["Bar of soap", "Shs. 1,800"], ["1 kg of beans", "Shs. 2,000"], ["Packet of salt", "Shs. 1,000"], ["1 litre of milk", "Shs. 2,000"]]}),
    {
        **stimulus("stimulus_q32", "Attendance graph unavailable", SOURCE_MISSING, ids("32"), page=13),
        "status": "needs_review",
        "needsReview": True,
        "reviewNotes": SOURCE_MISSING,
    },
]


assert sum(item["marks"] for item in questions) == 100

now = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
paper = {
    "paperId": PAPER_ID,
    "title": "Kampala Junior Academy Holiday Work Set Three",
    "subject": "Mathematics",
    "level": "Primary 4",
    "year": "2020",
    "term": "Term I",
    "examBody": "Kampala Junior Academy",
    "sourceFile": str(SOURCE),
    "fileName": SOURCE.name,
    "pages": 15,
    "ocrConfidence": 88.0,
    "status": "needs_review",
    "processedAt": now,
    "questionCount": len(questions),
    "questions": questions,
    "quizItems": questions,
    "questionGroups": [],
    "sharedStimuli": stimuli,
    "pageImagePaths": {str(i): str(PROCESSED / "page_images" / PAPER_ID / f"page_{i:02d}.png") for i in range(1, 16)},
}

paper_path = PROCESSED / "papers" / f"{PAPER_ID}.json"
paper_path.parent.mkdir(parents=True, exist_ok=True)
paper_path.write_text(json.dumps(paper, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

index_path = PROCESSED / "index.json"
index = json.loads(index_path.read_text())
entry = {
    "paperId": PAPER_ID,
    "fileName": SOURCE.name,
    "filePath": str(SOURCE),
    "relativePath": "Uploaded/P4 Holiday package .pdf",
    "fileSizeBytes": SOURCE.stat().st_size,
    "pages": 15,
    "subject": "Mathematics",
    "level": "Primary 4",
    "year": "2020",
    "term": "Term I",
    "title": "Kampala Junior Academy Holiday Work Set Three",
    "status": "needs_review",
    "discoveredAt": "2026-08-22T05:39:15Z",
    "processedAt": now,
    "error": None,
}
index["papers"] = [p for p in index["papers"] if p.get("paperId") != PAPER_ID] + [entry]
index["updatedAt"] = now
index_path.write_text(json.dumps(index, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

print(f"Wrote {paper_path}")
print(f"Questions: {len(questions)} | Marks: {sum(item['marks'] for item in questions)}")
