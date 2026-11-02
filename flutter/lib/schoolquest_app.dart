import "dart:convert";

import "package:flutter/material.dart";
import "package:shared_preferences/shared_preferences.dart";

import "api/client.dart";
import "config/app_config.dart";
import "offline/answer_queue.dart";

abstract class TokenStore {
  Future<String?> read();
  Future<void> write(String token);
  Future<void> clear();
}

class MemoryTokenStore implements TokenStore {
  String? value;
  @override
  Future<void> clear() async => value = null;
  @override
  Future<String?> read() async => value;
  @override
  Future<void> write(String token) async => value = token;
}

class SchoolQuestApp extends StatefulWidget {
  const SchoolQuestApp({super.key, required this.config, required this.preferences, required this.tokens, this.pendingPaperId});

  final AppConfig config;
  final SharedPreferences preferences;
  final TokenStore tokens;
  final String? pendingPaperId;

  @override
  State<SchoolQuestApp> createState() => _SchoolQuestAppState();
}

class _SchoolQuestAppState extends State<SchoolQuestApp> {
  @override
  Widget build(BuildContext context) {
    final scale = widget.preferences.getDouble("schoolquest.textScale") ?? 1;
    return MaterialApp(
      title: "School Quest",
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF0C6B56), brightness: Brightness.light),
        useMaterial3: true,
        brightness: Brightness.light,
      ),
      builder: (context, child) => MediaQuery(
        data: MediaQuery.of(context).copyWith(textScaler: TextScaler.linear(scale.clamp(1, 1.6))),
        child: child ?? const SizedBox.shrink(),
      ),
      home: _Gate(config: widget.config, preferences: widget.preferences, tokens: widget.tokens, pendingPaperId: widget.pendingPaperId),
    );
  }
}

class _Gate extends StatefulWidget {
  const _Gate({required this.config, required this.preferences, required this.tokens, this.pendingPaperId});
  final AppConfig config;
  final SharedPreferences preferences;
  final TokenStore tokens;
  final String? pendingPaperId;

  @override
  State<_Gate> createState() => _GateState();
}

class _GateState extends State<_Gate> {
  var _ready = false;
  String? _token;

  @override
  void initState() {
    super.initState();
    widget.tokens.read().then((token) {
      if (mounted) setState(() { _token = token; _ready = true; });
    });
  }

  @override
  Widget build(BuildContext context) {
    if (!_ready) return const Scaffold(body: Center(child: CircularProgressIndicator(semanticsLabel: "Loading")));
    final seen = widget.preferences.getBool("schoolquest.onboarded") ?? false;
    if (!seen) {
      return _Onboarding(onDone: () async {
        await widget.preferences.setBool("schoolquest.onboarded", true);
        setState(() {});
      });
    }
    if (_token == null) {
      return _AuthScreen(config: widget.config, onSignedIn: (token) async {
        await widget.tokens.write(token);
        setState(() => _token = token);
      });
    }
    return _Shell(
      config: widget.config,
      preferences: widget.preferences,
      token: _token!,
      pendingPaperId: widget.pendingPaperId,
      onLogout: () async {
        final api = SchoolQuestApi(widget.config.apiBase)..token = _token;
        try { await api.delete("/api/mobile/session"); } catch (_) {}
        await widget.tokens.clear();
        if (mounted) setState(() => _token = null);
      },
      onTextScale: (value) async {
        await widget.preferences.setDouble("schoolquest.textScale", value);
        setState(() {});
      },
    );
  }
}

class _Onboarding extends StatelessWidget {
  const _Onboarding({required this.onDone});
  final VoidCallback onDone;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text("School Quest", style: Theme.of(context).textTheme.headlineMedium),
            const SizedBox(height: 24),
            const Text("Practice on your phone"),
            const SizedBox(height: 8),
            const Text("Exams are marked on the School Quest server. This phone keeps your sign-in and any answer that could not upload."),
            const Spacer(),
            SizedBox(width: double.infinity, child: FilledButton(onPressed: onDone, child: const Text("Continue"))),
          ]),
        ),
      ),
    );
  }
}

class _AuthScreen extends StatefulWidget {
  const _AuthScreen({required this.config, required this.onSignedIn});
  final AppConfig config;
  final Future<void> Function(String token) onSignedIn;
  @override
  State<_AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<_AuthScreen> {
  final _phone = TextEditingController();
  final _password = TextEditingController();
  var _busy = false;
  var _showPassword = false;
  String? _error;

  @override
  void dispose() {
    _phone.dispose();
    _password.dispose();
    super.dispose();
  }

  Future<void> _signIn() async {
    setState(() { _busy = true; _error = null; });
    try {
      final api = SchoolQuestApi(widget.config.apiBase);
      final body = await api.postJson("/api/mobile/session", {"phone": _phone.text.trim(), "password": _password.text});
      await widget.onSignedIn(body["token"] as String);
    } on ApiException catch (error) {
      setState(() => _error = error.message);
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Sign in")),
      body: ListView(padding: const EdgeInsets.all(24), children: [
        TextField(controller: _phone, keyboardType: TextInputType.phone, decoration: const InputDecoration(labelText: "Phone"), textInputAction: TextInputAction.next),
        const SizedBox(height: 12),
        TextField(
          controller: _password,
          obscureText: !_showPassword,
          decoration: InputDecoration(
            labelText: "Password",
            suffixIcon: IconButton(
              tooltip: _showPassword ? "Hide password" : "Show password",
              onPressed: () => setState(() => _showPassword = !_showPassword),
              icon: Icon(_showPassword ? Icons.visibility_off : Icons.visibility),
            ),
          ),
        ),
        if (_error != null) Padding(padding: const EdgeInsets.only(top: 12), child: Text(_error!, style: TextStyle(color: Theme.of(context).colorScheme.error))),
        const SizedBox(height: 20),
        FilledButton(onPressed: _busy ? null : _signIn, child: Text(_busy ? "Signing in" : "Sign in")),
        TextButton(onPressed: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => _RegisterScreen(config: widget.config, onSignedIn: widget.onSignedIn))), child: const Text("Create an account")),
      ]),
    );
  }
}

class _RegisterScreen extends StatefulWidget {
  const _RegisterScreen({required this.config, required this.onSignedIn});
  final AppConfig config;
  final Future<void> Function(String token) onSignedIn;
  @override
  State<_RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<_RegisterScreen> {
  final _name = TextEditingController();
  final _phone = TextEditingController();
  final _password = TextEditingController();
  final _guardian = TextEditingController();
  final _guardianPhone = TextEditingController();
  final _schoolQuery = TextEditingController();
  final _dob = TextEditingController();
  List<dynamic> _classes = [];
  List<dynamic> _schools = [];
  String? _classId;
  String? _schoolId;
  String _sex = "Female";
  String? _error;
  var _busy = false;

  @override
  void initState() {
    super.initState();
    SchoolQuestApi(widget.config.apiBase).getList("/api/mobile/classes").then((rows) {
      if (mounted) setState(() => _classes = rows);
    }).catchError((_) {});
  }

  @override
  void dispose() {
    for (final controller in [_name, _phone, _password, _guardian, _guardianPhone, _schoolQuery, _dob]) {
      controller.dispose();
    }
    super.dispose();
  }

  Future<void> _findSchools() async {
    final api = SchoolQuestApi(widget.config.apiBase);
    final rows = await api.getList("/api/schools?q=${Uri.encodeQueryComponent(_schoolQuery.text.trim())}");
    if (mounted) setState(() => _schools = rows);
  }

  Future<void> _create() async {
    setState(() { _busy = true; _error = null; });
    try {
      final api = SchoolQuestApi(widget.config.apiBase);
      final body = await api.postJson("/api/mobile/register", {
        "name": _name.text,
        "phone": _phone.text,
        "password": _password.text,
        "classGradeId": _classId ?? "",
        "sex": _sex,
        "guardianName": _guardian.text,
        "guardianPhone": _guardianPhone.text,
        "dateOfBirth": _dob.text,
        "emisSchoolId": _schoolId ?? "",
      });
      await widget.onSignedIn(body["token"] as String);
      if (mounted) Navigator.of(context).pop();
    } on ApiException catch (error) {
      setState(() => _error = error.message);
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Create an account")),
      body: ListView(padding: const EdgeInsets.all(24), children: [
        TextField(controller: _name, decoration: const InputDecoration(labelText: "Name")),
        TextField(controller: _phone, decoration: const InputDecoration(labelText: "Phone"), keyboardType: TextInputType.phone),
        TextField(controller: _password, decoration: const InputDecoration(labelText: "Password"), obscureText: true),
        DropdownButtonFormField<String>(
          initialValue: _sex,
          decoration: const InputDecoration(labelText: "Sex"),
          items: const [DropdownMenuItem(value: "Female", child: Text("Female")), DropdownMenuItem(value: "Male", child: Text("Male"))],
          onChanged: (value) => setState(() => _sex = value ?? "Female"),
        ),
        DropdownButtonFormField<String>(
          initialValue: _classId,
          decoration: const InputDecoration(labelText: "Class"),
          items: [for (final item in _classes) DropdownMenuItem(value: item["id"] as String, child: Text("${item["shortName"]}"))],
          onChanged: (value) => setState(() => _classId = value),
        ),
        TextField(controller: _dob, decoration: const InputDecoration(labelText: "Date of birth (YYYY-MM-DD)")),
        TextField(controller: _guardian, decoration: const InputDecoration(labelText: "Guardian name")),
        TextField(controller: _guardianPhone, decoration: const InputDecoration(labelText: "Guardian phone"), keyboardType: TextInputType.phone),
        TextField(controller: _schoolQuery, decoration: const InputDecoration(labelText: "School")),
        Align(alignment: Alignment.centerLeft, child: TextButton(onPressed: _findSchools, child: const Text("Find school"))),
        ..._schools.map((school) => ListTile(
              title: Text(school["name"] as String? ?? ""),
              subtitle: Text(school["district"] as String? ?? ""),
              selected: _schoolId == school["id"],
              onTap: () => setState(() => _schoolId = school["id"] as String),
            )),
        if (_error != null) Text(_error!, style: TextStyle(color: Theme.of(context).colorScheme.error)),
        const SizedBox(height: 12),
        FilledButton(onPressed: _busy ? null : _create, child: const Text("Create account")),
      ]),
    );
  }
}

class _Shell extends StatefulWidget {
  const _Shell({required this.config, required this.preferences, required this.token, required this.onLogout, required this.onTextScale, this.pendingPaperId});
  final AppConfig config;
  final SharedPreferences preferences;
  final String token;
  final Future<void> Function() onLogout;
  final Future<void> Function(double value) onTextScale;
  final String? pendingPaperId;
  @override
  State<_Shell> createState() => _ShellState();
}

class _ShellState extends State<_Shell> {
  late final SchoolQuestApi _api = SchoolQuestApi(widget.config.apiBase)..token = widget.token;
  Map<String, dynamic>? _home;
  String? _error;
  var _offline = false;
  var _tab = 0;
  var _openedLink = false;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    try {
      final home = await _api.getJson("/api/mobile/home");
      if (!mounted) return;
      setState(() { _home = home; _error = null; _offline = false; });
      final paperId = widget.pendingPaperId;
      if (paperId != null && !_openedLink) {
        _openedLink = true;
        await _openPaper(paperId);
      }
    } on ApiException catch (error) {
      if (!mounted) return;
      setState(() { _error = error.message; _offline = error.message.contains("offline"); });
    }
  }

  Future<void> _openPaper(String paperId) async {
    await Navigator.of(context).push(MaterialPageRoute(builder: (_) => _ExamScreen(api: _api, paperId: paperId, preferences: widget.preferences)));
    await _load();
  }

  @override
  Widget build(BuildContext context) {
    final home = _home;
    final pages = [
      _HomeTab(home: home, error: _error, offline: _offline, onRefresh: _load, onOpen: _openPaper),
      _LearnTab(home: home, api: _api, onOpen: _openPaper),
      _ResultsTab(home: home, onRefresh: _load),
      _ProfileTab(home: home, preferences: widget.preferences, onLogout: widget.onLogout, onTextScale: widget.onTextScale, api: _api),
    ];
    return Scaffold(
      body: SafeArea(child: pages[_tab]),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _tab,
        onDestinationSelected: (index) => setState(() => _tab = index),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: "Home"),
          NavigationDestination(icon: Icon(Icons.menu_book_outlined), selectedIcon: Icon(Icons.menu_book), label: "Learn"),
          NavigationDestination(icon: Icon(Icons.fact_check_outlined), selectedIcon: Icon(Icons.fact_check), label: "Results"),
          NavigationDestination(icon: Icon(Icons.person_outline), selectedIcon: Icon(Icons.person), label: "Profile"),
        ],
      ),
    );
  }
}

class _HomeTab extends StatelessWidget {
  const _HomeTab({required this.home, required this.error, required this.offline, required this.onRefresh, required this.onOpen});
  final Map<String, dynamic>? home;
  final String? error;
  final bool offline;
  final Future<void> Function() onRefresh;
  final Future<void> Function(String paperId) onOpen;

  @override
  Widget build(BuildContext context) {
    final name = (home?["name"] as String?)?.split(" ").first ?? "there";
    final current = home?["continue"] as Map?;
    return RefreshIndicator(
      onRefresh: onRefresh,
      child: ListView(padding: const EdgeInsets.all(20), children: [
        if (offline) const _Banner(text: "You are offline. Saved answers stay on this phone."),
        Text("Hello, $name", style: Theme.of(context).textTheme.headlineSmall),
        Text(home?["classLabel"] as String? ?? ""),
        const SizedBox(height: 16),
        Text("${home?["xp"] ?? 0} XP · ${home?["streak"] ?? 0} day streak"),
        const SizedBox(height: 16),
        if (current != null)
          Card(child: ListTile(
            title: const Text("Continue where you left off"),
            subtitle: Text("${current["subject"]} · ${current["title"]}"),
            onTap: () => onOpen(current["paperId"] as String),
          )),
        if (error != null && home == null) Text(error!),
        if (home != null && (home!["subjects"] as List).isEmpty) const Text("No subjects for this class yet."),
      ]),
    );
  }
}

class _LearnTab extends StatelessWidget {
  const _LearnTab({required this.home, required this.api, required this.onOpen});
  final Map<String, dynamic>? home;
  final SchoolQuestApi api;
  final Future<void> Function(String paperId) onOpen;

  @override
  Widget build(BuildContext context) {
    final subjects = (home?["subjects"] as List?) ?? [];
    if (subjects.isEmpty) return const Center(child: Text("Subjects appear after you sign in."));
    return ListView(children: [
      for (final subject in subjects)
        ListTile(
          title: Text(subject["name"] as String? ?? "Subject"),
          subtitle: Text("${subject["notes"]} notes · ${subject["papers"]} papers"),
          onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => _SubjectScreen(api: api, subjectId: subject["id"] as String, onOpen: onOpen))),
        ),
    ]);
  }
}

class _SubjectScreen extends StatefulWidget {
  const _SubjectScreen({required this.api, required this.subjectId, required this.onOpen});
  final SchoolQuestApi api;
  final String subjectId;
  final Future<void> Function(String paperId) onOpen;
  @override
  State<_SubjectScreen> createState() => _SubjectScreenState();
}

class _SubjectScreenState extends State<_SubjectScreen> {
  Map<String, dynamic>? _subject;
  String? _error;

  @override
  void initState() {
    super.initState();
    widget.api.getJson("/api/mobile/subjects/${widget.subjectId}").then((value) {
      if (mounted) setState(() => _subject = value);
    }).catchError((error) {
      if (mounted) setState(() => _error = error.toString());
    });
  }

  @override
  Widget build(BuildContext context) {
    final subject = _subject;
    return Scaffold(
      appBar: AppBar(title: Text(subject?["name"] as String? ?? "Subject")),
      body: subject == null
          ? Center(child: _error == null ? const CircularProgressIndicator(semanticsLabel: "Loading") : Text(_error!))
          : ListView(children: [
              const ListTile(title: Text("Practice papers")),
              if ((subject["papers"] as List).isEmpty) const ListTile(title: Text("No papers yet.")),
              for (final paper in subject["papers"] as List)
                ListTile(
                  title: Text(paper["title"] as String? ?? "Paper"),
                  subtitle: Text(paper["year"]?.toString() ?? ""),
                  onTap: () => widget.onOpen(paper["id"] as String),
                ),
              const ListTile(title: Text("Notes")),
              if ((subject["notes"] as List).isEmpty) const ListTile(title: Text("No notes yet.")),
              for (final note in subject["notes"] as List)
                ListTile(
                  title: Text(note["title"] as String? ?? "Note"),
                  subtitle: Text(note["summary"] as String? ?? ""),
                  onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => _NoteScreen(api: widget.api, noteId: note["id"] as String))),
                ),
            ]),
    );
  }
}

class _NoteScreen extends StatefulWidget {
  const _NoteScreen({required this.api, required this.noteId});
  final SchoolQuestApi api;
  final String noteId;
  @override
  State<_NoteScreen> createState() => _NoteScreenState();
}

class _NoteScreenState extends State<_NoteScreen> {
  Map<String, dynamic>? _note;
  @override
  void initState() {
    super.initState();
    widget.api.getJson("/api/mobile/notes/${widget.noteId}").then((value) { if (mounted) setState(() => _note = value); });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(_note?["title"] as String? ?? "Note")),
      body: _note == null
          ? const Center(child: CircularProgressIndicator(semanticsLabel: "Loading"))
          : SingleChildScrollView(padding: const EdgeInsets.all(20), child: SelectableText(_note?["content"] as String? ?? "")),
    );
  }
}

class _ExamScreen extends StatefulWidget {
  const _ExamScreen({required this.api, required this.paperId, required this.preferences});
  final SchoolQuestApi api;
  final String paperId;
  final SharedPreferences preferences;
  @override
  State<_ExamScreen> createState() => _ExamScreenState();
}

class _ExamScreenState extends State<_ExamScreen> {
  Map<String, dynamic>? _paper;
  Map<String, dynamic>? _session;
  final _answers = <String, String>{};
  final _versions = <String, int>{};
  var _index = 0;
  String? _error;
  var _offline = false;
  final _text = TextEditingController();

  @override
  void initState() {
    super.initState();
    _start();
  }

  @override
  void dispose() {
    _text.dispose();
    super.dispose();
  }

  Future<void> _start() async {
    try {
      final paper = await widget.api.getJson("/api/mobile/papers/${widget.paperId}");
      final session = await widget.api.postJson("/api/mobile/papers/${widget.paperId}", {});
      final saved = Map<String, dynamic>.from(session["answers"] as Map? ?? {});
      final versions = Map<String, dynamic>.from(session["versions"] as Map? ?? {});
      saved.forEach((key, value) => _answers[key] = value?.toString() ?? "");
      versions.forEach((key, value) => _versions[key] = value is int ? value : int.tryParse("$value") ?? 0);
      final queue = AnswerQueue.decode(widget.preferences.getString("schoolquest.answerQueue") ?? "");
      for (final pending in queue.take(session["attemptId"] as String)) {
        _answers[pending.questionId] = pending.value;
        _versions[pending.questionId] = pending.version;
      }
      await widget.preferences.setString("schoolquest.answerQueue", queue.encode());
      if (!mounted) return;
      setState(() { _paper = paper; _session = session; _offline = false; });
      _showCurrent();
    } on ApiException catch (error) {
      if (mounted) setState(() { _error = error.message; _offline = error.message.contains("offline"); });
    }
  }

  List<dynamic> get _questions => (_paper?["questions"] as List?) ?? [];

  void _showCurrent() {
    if (_questions.isEmpty) return;
    final question = _questions[_index] as Map;
    _text.text = _answers[question["id"]] ?? "";
  }

  Future<void> _saveCurrent() async {
    if (_questions.isEmpty || _session == null) return;
    final question = _questions[_index] as Map;
    final id = question["id"] as String;
    _answers[id] = _text.text;
    final version = _versions[id] ?? 0;
    try {
      final saved = await widget.api.postJson("/api/mobile/attempts/${_session!["attemptId"]}", {
        "writes": [
          {"questionId": id, "value": _text.text, "version": version}
        ],
      });
      final versions = Map<String, dynamic>.from(saved["versions"] as Map? ?? {});
      versions.forEach((key, value) => _versions[key] = value is int ? value : int.tryParse("$value") ?? version);
      if (mounted) setState(() => _offline = false);
    } on ApiException {
      final queue = AnswerQueue.decode(widget.preferences.getString("schoolquest.answerQueue") ?? "");
      queue.upsert(PendingAnswer(attemptId: _session!["attemptId"] as String, questionId: id, value: _text.text, version: version));
      await widget.preferences.setString("schoolquest.answerQueue", queue.encode());
      if (mounted) setState(() { _offline = true; _error = "Saved on this phone. It will upload when the connection returns."; });
    }
  }

  Future<void> _submit() async {
    await _saveCurrent();
    if (_session == null) return;
    final incoming = {for (final entry in _answers.entries) entry.key: {"value": entry.value, "version": _versions[entry.key] ?? 0}};
    try {
      final result = await widget.api.postJson("/api/mobile/attempts/${_session!["attemptId"]}", {"action": "submit", "answers": incoming});
      if (!mounted) return;
      await Navigator.of(context).push(MaterialPageRoute(builder: (_) => _ResultDetail(result: result)));
      if (mounted) Navigator.of(context).pop();
    } on ApiException catch (error) {
      if (mounted) setState(() => _error = error.message);
    }
  }

  @override
  Widget build(BuildContext context) {
    final questions = _questions;
    if (_paper == null) {
      return Scaffold(appBar: AppBar(title: const Text("Exam")), body: Center(child: _error == null ? const CircularProgressIndicator(semanticsLabel: "Loading") : Text(_error!)));
    }
    if (questions.isEmpty) return Scaffold(appBar: AppBar(title: Text(_paper!["title"] as String? ?? "Exam")), body: const Center(child: Text("This paper has no questions.")));
    final question = questions[_index] as Map;
    final options = _options(question["options"]);
    return PopScope(
      canPop: true,
      child: Scaffold(
        appBar: AppBar(title: Text(_paper!["title"] as String? ?? "Exam")),
        body: ListView(padding: const EdgeInsets.all(20), children: [
          if (_offline) const _Banner(text: "You are offline. This answer is kept on the phone."),
          Text("Question ${_index + 1} of ${questions.length} · ${question["points"]} marks"),
          const SizedBox(height: 12),
          Text(question["prompt"] as String? ?? ""),
          const SizedBox(height: 16),
          if (options.isNotEmpty)
            for (final option in options)
              ListTile(
                leading: Icon(_answers[question["id"]] == option ? Icons.radio_button_checked : Icons.radio_button_off),
                title: Text(option),
                onTap: () => setState(() { _answers[question["id"] as String] = option; _text.text = option; }),
              )
          else
            TextField(controller: _text, decoration: const InputDecoration(labelText: "Your answer"), minLines: 2, maxLines: 6),
          if (_error != null) Padding(padding: const EdgeInsets.only(top: 12), child: Text(_error!)),
          const SizedBox(height: 16),
          Row(children: [
            if (_index > 0) OutlinedButton(onPressed: () async { await _saveCurrent(); setState(() => _index -= 1); _showCurrent(); }, child: const Text("Back")),
            const Spacer(),
            if (_index < questions.length - 1)
              FilledButton(onPressed: () async { await _saveCurrent(); setState(() => _index += 1); _showCurrent(); }, child: const Text("Next"))
            else
              FilledButton(onPressed: _submit, child: const Text("Submit")),
          ]),
        ]),
      ),
    );
  }

  List<String> _options(Object? raw) {
    if (raw is! String || raw.isEmpty) return [];
    try {
      final decoded = jsonDecode(raw);
      if (decoded is List) return decoded.map((item) => item.toString()).toList();
    } catch (_) {}
    return [];
  }
}

class _ResultDetail extends StatelessWidget {
  const _ResultDetail({required this.result});
  final Map<String, dynamic> result;
  @override
  Widget build(BuildContext context) {
    final summary = result["result"] as Map? ?? {};
    final feedback = (result["feedback"] as List?) ?? [];
    return Scaffold(
      appBar: AppBar(title: const Text("Result")),
      body: ListView(padding: const EdgeInsets.all(20), children: [
        Text("${summary["score"] ?? 0} / ${summary["maxScore"] ?? 0}", style: Theme.of(context).textTheme.headlineMedium),
        if ((summary["pendingCount"] as num? ?? 0) > 0) const Text("Some answers still need a teacher."),
        for (final item in feedback) ListTile(title: Text(item["feedback"] as String? ?? "Saved"), subtitle: Text(item["gradingStatus"] as String? ?? "")),
      ]),
    );
  }
}

class _ResultsTab extends StatelessWidget {
  const _ResultsTab({required this.home, required this.onRefresh});
  final Map<String, dynamic>? home;
  final Future<void> Function() onRefresh;
  @override
  Widget build(BuildContext context) {
    final results = (home?["results"] as List?) ?? [];
    return RefreshIndicator(
      onRefresh: onRefresh,
      child: ListView(children: [
        const ListTile(title: Text("Results")),
        if (results.isEmpty) const ListTile(title: Text("No submitted papers yet.")),
        for (final result in results)
          ListTile(
            title: Text(result["title"] as String? ?? "Paper"),
            subtitle: Text("${result["subject"]} · ${result["score"]} / ${result["maxScore"]}"),
          ),
      ]),
    );
  }
}

class _ProfileTab extends StatelessWidget {
  const _ProfileTab({required this.home, required this.preferences, required this.onLogout, required this.onTextScale, required this.api});
  final Map<String, dynamic>? home;
  final SharedPreferences preferences;
  final Future<void> Function() onLogout;
  final Future<void> Function(double value) onTextScale;
  final SchoolQuestApi api;

  @override
  Widget build(BuildContext context) {
    final help = home?["help"] as Map?;
    final scale = preferences.getDouble("schoolquest.textScale") ?? 1;
    return ListView(children: [
      ListTile(title: Text(home?["name"] as String? ?? "Profile"), subtitle: Text(home?["classLabel"] as String? ?? "")),
      ListTile(title: const Text("Text size"), subtitle: Slider(value: scale.clamp(1, 1.6), min: 1, max: 1.6, onChanged: onTextScale)),
      ListTile(title: const Text("Subscription"), onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => _SubscriptionScreen(api: api)))),
      ListTile(title: const Text("Help"), subtitle: Text(help?["about"] as String? ?? "School Quest"), onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => _HelpScreen(help: help)))),
      ListTile(title: const Text("Sign out"), onTap: onLogout),
    ]);
  }
}

class _SubscriptionScreen extends StatefulWidget {
  const _SubscriptionScreen({required this.api});
  final SchoolQuestApi api;
  @override
  State<_SubscriptionScreen> createState() => _SubscriptionScreenState();
}

class _SubscriptionScreenState extends State<_SubscriptionScreen> {
  Map<String, dynamic>? _status;
  String? _message;

  @override
  void initState() {
    super.initState();
    widget.api.getJson("/api/mobile/subscription").then((value) { if (mounted) setState(() => _status = value); });
  }

  @override
  Widget build(BuildContext context) {
    final status = _status;
    final plans = (status?["plans"] as List?) ?? [];
    return Scaffold(
      appBar: AppBar(title: const Text("Subscription")),
      body: status == null
          ? const Center(child: CircularProgressIndicator(semanticsLabel: "Loading"))
          : ListView(padding: const EdgeInsets.all(20), children: [
              Text(status["trialActive"] == true ? "Trial is active" : "Trial is not active"),
              Text(status["subscriptionActive"] == true ? "Subscription is active" : "No paid subscription is active"),
              const SizedBox(height: 12),
              Text(status["billing"] as String? ?? ""),
              for (final plan in plans) ListTile(title: Text(plan["name"] as String? ?? ""), subtitle: Text("${plan["price"]} ${plan["currency"]} · ${plan["period"]}")),
              FilledButton(
                onPressed: () async {
                  try {
                    await widget.api.postJson("/api/mobile/subscription", {});
                  } on ApiException catch (error) {
                    if (mounted) setState(() => _message = error.message);
                  }
                },
                child: const Text("Confirm on the server"),
              ),
              if (_message != null) Padding(padding: const EdgeInsets.only(top: 12), child: Text(_message!)),
            ]),
    );
  }
}

class _HelpScreen extends StatelessWidget {
  const _HelpScreen({required this.help});
  final Map? help;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Help")),
      body: ListView(padding: const EdgeInsets.all(20), children: [
        Text(help?["about"] as String? ?? "School Quest"),
        const SizedBox(height: 12),
        SelectableText("WhatsApp ${help?["whatsapp"] ?? ""}"),
        SelectableText(help?["products"] as String? ?? ""),
      ]),
    );
  }
}

class _Banner extends StatelessWidget {
  const _Banner({required this.text});
  final String text;
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      color: const Color(0xFFFFF4D6),
      child: Text(text),
    );
  }
}
