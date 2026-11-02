class PendingAnswer {
  const PendingAnswer({required this.attemptId, required this.questionId, required this.value, required this.version});

  final String attemptId;
  final String questionId;
  final String value;
  final int version;

  Map<String, Object> toJson() => {"attemptId": attemptId, "questionId": questionId, "value": value, "version": version};

  factory PendingAnswer.fromJson(Map<String, Object?> json) {
    return PendingAnswer(
      attemptId: json["attemptId"] as String? ?? "",
      questionId: json["questionId"] as String? ?? "",
      value: json["value"] as String? ?? "",
      version: json["version"] as int? ?? 0,
    );
  }
}

class AnswerQueue {
  AnswerQueue([List<PendingAnswer>? items]) : items = [...?items];

  final List<PendingAnswer> items;

  void upsert(PendingAnswer answer) {
    items.removeWhere((item) => item.attemptId == answer.attemptId && item.questionId == answer.questionId);
    items.add(answer);
  }

  List<PendingAnswer> take(String attemptId) {
    final mine = items.where((item) => item.attemptId == attemptId).toList();
    items.removeWhere((item) => item.attemptId == attemptId);
    return mine;
  }

  String encode() => items.map((item) => "${item.attemptId}\t${item.questionId}\t${item.version}\t${Uri.encodeComponent(item.value)}").join("\n");

  factory AnswerQueue.decode(String raw) {
    if (raw.trim().isEmpty) return AnswerQueue();
    final items = raw.split("\n").where((line) => line.contains("\t")).map((line) {
      final parts = line.split("\t");
      return PendingAnswer(
        attemptId: parts[0],
        questionId: parts[1],
        version: int.tryParse(parts[2]) ?? 0,
        value: Uri.decodeComponent(parts.length > 3 ? parts.sublist(3).join("\t") : ""),
      );
    });
    return AnswerQueue(items.toList());
  }
}
