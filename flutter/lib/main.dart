import "package:flutter/material.dart";
import "package:flutter_secure_storage/flutter_secure_storage.dart";
import "package:shared_preferences/shared_preferences.dart";

import "config/app_config.dart";
import "schoolquest_app.dart";

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final config = AppConfig.resolve(
    flavor: const String.fromEnvironment("APP_FLAVOR", defaultValue: "production"),
    apiBase: const String.fromEnvironment("API_BASE"),
  );
  final preferences = await SharedPreferences.getInstance();
  runApp(SchoolQuestApp(
    config: config,
    preferences: preferences,
    tokens: SecureTokenStore(const FlutterSecureStorage()),
  ));
}

class SecureTokenStore implements TokenStore {
  SecureTokenStore(this.storage);
  final FlutterSecureStorage storage;

  @override
  Future<void> clear() => storage.delete(key: "schoolquest.token");

  @override
  Future<String?> read() => storage.read(key: "schoolquest.token");

  @override
  Future<void> write(String token) => storage.write(key: "schoolquest.token", value: token);
}
