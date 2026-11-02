import "dart:async";
import "dart:convert";
import "dart:io";

import "package:http/http.dart" as http;

class ApiException implements Exception {
  ApiException(this.message);
  final String message;
  @override
  String toString() => message;
}

class SchoolQuestApi {
  SchoolQuestApi(this.base, {http.Client? client}) : _client = client ?? http.Client();

  final String base;
  final http.Client _client;
  String? token;

  Map<String, String> get _headers => {
        "accept": "application/json",
        "content-type": "application/json",
        if (token != null) "authorization": "Bearer $token",
      };

  Future<Map<String, dynamic>> getJson(String path) async => _decode(await _send(() => _client.get(Uri.parse("$base$path"), headers: _headers)));

  Future<List<dynamic>> getList(String path) async {
    final response = await _send(() => _client.get(Uri.parse("$base$path"), headers: _headers));
    final decoded = jsonDecode(response.body);
    if (decoded is List) return decoded;
    throw ApiException("Unexpected response.");
  }

  Future<Map<String, dynamic>> postJson(String path, Map<String, Object?> body) async {
    return _decode(await _send(() => _client.post(Uri.parse("$base$path"), headers: _headers, body: jsonEncode(body))));
  }

  Future<void> delete(String path) async {
    await _send(() => _client.delete(Uri.parse("$base$path"), headers: _headers));
  }

  Future<http.Response> _send(Future<http.Response> Function() call) async {
    try {
      final response = await call().timeout(const Duration(seconds: 20));
      if (response.statusCode == 401) throw ApiException("Sign in again.");
      if (response.statusCode >= 400) {
        final decoded = jsonDecode(response.body);
        final message = decoded is Map && decoded["error"] is String ? decoded["error"] as String : "The request failed.";
        throw ApiException(message);
      }
      return response;
    } on SocketException {
      throw ApiException("You are offline.");
    } on http.ClientException {
      throw ApiException("You are offline.");
    } on TimeoutException {
      throw ApiException("You are offline.");
    }
  }

  Map<String, dynamic> _decode(http.Response response) {
    final decoded = jsonDecode(response.body);
    if (decoded is Map<String, dynamic>) return decoded;
    if (decoded is Map) return decoded.map((key, value) => MapEntry(key.toString(), value));
    throw ApiException("Unexpected response.");
  }
}
