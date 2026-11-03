# School Quest mobile

Android and iOS client for the School Quest server. The application id is `com.schoolquest.app`.

Production and staging builds use https://schoolquestweb.netlify.app. A development build needs an explicit server:

```
flutter run --dart-define=APP_FLAVOR=development --dart-define=API_BASE=http://10.0.2.2:3000
```

Release signing uses `android/key.properties` when that file is present. Do not commit it or the keystore. iOS device distribution needs an Apple Developer signing certificate.
