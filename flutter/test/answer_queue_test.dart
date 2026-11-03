import "package:flutter_test/flutter_test.dart";
import "package:schoolquest/offline/answer_queue.dart";

void main() {
  test("a newer answer replaces the saved one and survives encoding", () {
    final queue = AnswerQueue()
      ..upsert(const PendingAnswer(attemptId: "a", questionId: "q", value: "old", version: 1))
      ..upsert(const PendingAnswer(attemptId: "a", questionId: "q", value: "Nile", version: 2));
    expect(queue.items, hasLength(1));
    final restored = AnswerQueue.decode(queue.encode());
    expect(restored.items.single.value, "Nile");
    expect(restored.take("a").single.version, 2);
    expect(restored.items, isEmpty);
  });
}
