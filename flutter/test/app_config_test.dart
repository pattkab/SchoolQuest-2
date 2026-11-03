import "package:flutter_test/flutter_test.dart";
import "package:schoolquest/config/app_config.dart";

void main() {
  test("production uses the live site", () {
    final config = AppConfig.resolve(flavor: "production", apiBase: "");
    expect(config.apiBase, AppConfig.productionBase);
    expect(config.flavor, AppFlavor.production);
  });

  test("production rejects a local server", () {
    expect(() => AppConfig.resolve(flavor: "production", apiBase: "http://localhost:3000"), throwsStateError);
    expect(() => AppConfig.resolve(flavor: "staging", apiBase: "http://10.0.2.2:3000"), throwsStateError);
  });

  test("development requires an explicit server", () {
    expect(() => AppConfig.resolve(flavor: "development", apiBase: ""), throwsStateError);
    final config = AppConfig.resolve(flavor: "development", apiBase: "http://10.0.2.2:3000");
    expect(config.flavor, AppFlavor.development);
  });

  test("a paper link opens that paper", () {
    expect(linkFor(Uri.parse("schoolquest://paper/abc"))?.paperId, "abc");
    expect(linkFor(Uri.parse("https://schoolquestweb.netlify.app/dashboard/papers/abc"))?.paperId, "abc");
    expect(linkFor(Uri.parse("https://schoolquestweb.netlify.app/dashboard")), isNull);
  });
}
