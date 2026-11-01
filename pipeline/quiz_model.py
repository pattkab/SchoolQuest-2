"""Build independently answerable quiz items while preserving parent context."""

import re
from typing import Optional


def display_number(number: str) -> str:
    m = re.match(r"^(\d+)(?:[_-]?([a-z]))?(?:[_-]?([ivx]+))?$", number, re.I)
    if not m:
        return number
    return m.group(1) + (f"({m.group(2)})" if m.group(2) else "") + (f"({m.group(3)})" if m.group(3) else "")


def _item(question: dict, parent: Optional[dict], stimulus_ids: list[str]) -> dict:
    options = question.get("options", [])
    return {
        **question,
        "quizItemId": question["questionId"],
        "parentQuestionId": parent.get("questionId") if parent else None,
        "parentInstruction": parent.get("questionText") if parent else None,
        "displayNumber": display_number(question.get("questionNumber", "")),
        "prompt": question.get("questionText", ""),
        "answerType": "multiple_choice" if options else "text",
        "studentInputType": "choice" if options else "image_or_text",
        "linkedStimulusIds": stimulus_ids,
        "acceptedAnswers": [],
        "subQuestions": [],
    }


def build_quiz_model(questions: list[dict], stimuli: list[dict]) -> tuple[list[dict], list[dict]]:
    quiz_items, groups = [], []
    for parent in questions:
        parent_stimuli = [s["stimulusId"] for s in stimuli if s.get("parentQuestionId") == parent["questionId"]]
        children = parent.get("subQuestions", [])
        if children:
            child_ids = []
            for child in children:
                item = _item(child, parent, parent_stimuli)
                quiz_items.append(item)
                child_ids.append(item["quizItemId"])
            groups.append({
                "parentQuestionId": parent["questionId"],
                "parentInstruction": parent.get("questionText", ""),
                "stimulusIds": parent_stimuli,
                "childQuizItemIds": child_ids,
            })
        else:
            quiz_items.append(_item(parent, None, parent_stimuli))

    linked = {item["quizItemId"]: item for item in quiz_items}
    for stimulus in stimuli:
        stimulus["linkedQuizItemIds"] = [qid for qid in stimulus.get("linkedQuizItemIds", []) if qid in linked]
        for qid in stimulus["linkedQuizItemIds"]:
            if stimulus["stimulusId"] not in linked[qid]["linkedStimulusIds"]:
                linked[qid]["linkedStimulusIds"].append(stimulus["stimulusId"])
    return quiz_items, groups
