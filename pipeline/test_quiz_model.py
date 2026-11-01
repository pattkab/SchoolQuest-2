import unittest
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from quiz_model import build_quiz_model, display_number


class QuizModelTests(unittest.TestCase):
    def test_group_children_are_independent_and_share_stimulus(self):
        parent = {
            "questionId": "parent", "paperId": "paper", "questionNumber": "55",
            "questionText": "Use the table below.", "subQuestions": [
                {"questionId": "one", "paperId": "paper", "questionNumber": "55_a_i", "questionText": "Identify A.", "options": [], "subQuestions": []},
                {"questionId": "two", "paperId": "paper", "questionNumber": "55_a_ii", "questionText": "Identify C.", "options": [], "subQuestions": []},
            ],
        }
        stimulus = {"stimulusId": "stimulus", "parentQuestionId": "parent", "linkedQuizItemIds": ["one", "two"]}
        items, groups = build_quiz_model([parent], [stimulus])
        self.assertEqual([i["quizItemId"] for i in items], ["one", "two"])
        self.assertTrue(all(i["linkedStimulusIds"] == ["stimulus"] for i in items))
        self.assertEqual(groups[0]["childQuizItemIds"], ["one", "two"])

    def test_display_number_preserves_hierarchy(self):
        self.assertEqual(display_number("55_a_ii"), "55(a)(ii)")


if __name__ == "__main__":
    unittest.main()
