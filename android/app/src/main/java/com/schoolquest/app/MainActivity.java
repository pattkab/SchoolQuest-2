package com.schoolquest.app;

import android.os.Build;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AlertDialog;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.splashscreen.SplashScreen;
import androidx.core.view.WindowCompat;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.CapConfig;
import com.google.firebase.analytics.FirebaseAnalytics;
import java.nio.charset.StandardCharsets;
import org.json.JSONObject;

public class MainActivity extends BridgeActivity {
    private static android.content.Context appContext;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        appContext = getApplicationContext();
        SplashScreen.installSplashScreen(this);
        super.onCreate(savedInstanceState);
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView()).setAppearanceLightStatusBars(true);
        WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView()).setAppearanceLightNavigationBars(true);
        if (Build.VERSION.SDK_INT >= 33 && ContextCompat.checkSelfPermission(this, android.Manifest.permission.POST_NOTIFICATIONS) != android.content.pm.PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{android.Manifest.permission.POST_NOTIFICATIONS}, 41);
        }
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                WebView webView = bridge != null ? bridge.getWebView() : null;
                if (webView != null && webView.canGoBack()) {
                    webView.goBack();
                    return;
                }
                new AlertDialog.Builder(MainActivity.this)
                    .setTitle("Leave School Quest?")
                    .setNegativeButton("Stay", null)
                    .setPositiveButton("Leave", (dialog, which) -> finish())
                    .show();
            }
        });
    }

    @Override
    protected void load() {
        String serverUrl = BuildConfig.SERVER_URL;
        if (serverUrl != null && !serverUrl.isEmpty()) {
            try {
                String raw = new String(getAssets().open("capacitor.config.json").readAllBytes(), StandardCharsets.UTF_8);
                JSONObject json = new JSONObject(raw);
                JSONObject server = json.optJSONObject("server");
                if (server == null) {
                    server = new JSONObject();
                    json.put("server", server);
                }
                server.put("url", serverUrl);
                if (BuildConfig.DEBUG) {
                    JSONObject androidConfig = json.optJSONObject("android");
                    if (androidConfig == null) {
                        androidConfig = new JSONObject();
                        json.put("android", androidConfig);
                    }
                    androidConfig.put("webContentsDebuggingEnabled", true);
                }
                this.config = new CapConfig(getAssets(), json);
            } catch (Exception ignored) {
                // Fall back to the config copied by Capacitor and the bundled offline page.
            }
        }
        super.load();
        if (bridge != null && bridge.getWebView() != null) {
            bridge.getWebView().addJavascriptInterface(new AnalyticsBridge(), "SchoolQuestNative");
            String hardware = Build.HARDWARE == null ? "" : Build.HARDWARE;
            if (hardware.contains("ranchu") || hardware.contains("goldfish")) {
                bridge.getWebView().setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
            }
        }
    }

    private static final class AnalyticsBridge {
        @JavascriptInterface
        public void log(String name) {
            if (appContext == null || name == null || !name.matches("sq_[a-z0-9_]{1,36}")) return;
            FirebaseAnalytics.getInstance(appContext).logEvent(name, null);
        }
    }
}
