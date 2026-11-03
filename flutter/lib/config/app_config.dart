enum AppFlavor { development, staging, production }

class AppConfig {
  const AppConfig({required this.flavor, required this.apiBase});

  final AppFlavor flavor;
  final String apiBase;

  static const productionBase = "https://schoolquestweb.netlify.app";

  factory AppConfig.resolve({required String flavor, required String apiBase}) {
    final parsed = switch (flavor) {
      "development" => AppFlavor.development,
      "staging" => AppFlavor.staging,
      _ => AppFlavor.production,
    };
    final chosen = (apiBase.isEmpty && parsed != AppFlavor.development ? productionBase : apiBase).replaceAll(RegExp(r"/+$"), "");
    final host = Uri.tryParse(chosen)?.host ?? "";
    final local = host == "localhost" || host == "127.0.0.1" || host.startsWith("10.0.2.");
    if (parsed == AppFlavor.development) {
      if (chosen.isEmpty) throw StateError("Set API_BASE for the development build.");
    } else if (!chosen.startsWith("https://") || local) {
      throw StateError("Staging and production use the public https School Quest site.");
    }
    return AppConfig(flavor: parsed, apiBase: chosen);
  }
}

class AppLink {
  const AppLink(this.paperId);
  final String paperId;
}

AppLink? linkFor(Uri uri) {
  if (uri.scheme == "schoolquest" && uri.host == "paper" && uri.pathSegments.isNotEmpty) {
    return AppLink(uri.pathSegments.first);
  }
  if (uri.pathSegments.length >= 3 && uri.pathSegments[0] == "dashboard" && uri.pathSegments[1] == "papers") {
    return AppLink(uri.pathSegments[2]);
  }
  if (uri.pathSegments.length >= 2 && uri.pathSegments.first == "paper") return AppLink(uri.pathSegments[1]);
  return null;
}
