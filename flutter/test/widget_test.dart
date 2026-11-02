import "package:flutter_test/flutter_test.dart";
import "package:schoolquest/config/app_config.dart";
import "package:schoolquest/schoolquest_app.dart";
import "package:shared_preferences/shared_preferences.dart";

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets("onboarding leads to sign in", (tester) async {
    SharedPreferences.setMockInitialValues({});
    final preferences = await SharedPreferences.getInstance();
    await tester.pumpWidget(SchoolQuestApp(
      config: AppConfig.resolve(flavor: "production", apiBase: ""),
      preferences: preferences,
      tokens: MemoryTokenStore(),
    ));
    await tester.pumpAndSettle();
    expect(find.text("Practice on your phone"), findsOneWidget);
    await tester.tap(find.text("Continue"));
    await tester.pumpAndSettle();
    expect(find.text("Sign in"), findsWidgets);
  });
}
