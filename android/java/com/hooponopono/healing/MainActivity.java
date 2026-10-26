package com.hooponopono.healing;

import android.app.Activity;
import android.app.NotificationManager;
import android.content.ClipData;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.app.AlarmManager;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import java.util.List;
import java.util.ArrayList;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.provider.Settings;
import android.util.Base64;
import android.view.View;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.UUID;
import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.ProductDetails;
import com.android.billingclient.api.ProductDetailsResponseListener;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.PurchasesResponseListener;
import com.android.billingclient.api.PurchasesUpdatedListener;
import com.android.billingclient.api.QueryProductDetailsParams;
import com.android.billingclient.api.QueryPurchasesParams;
import com.android.billingclient.api.QueryProductDetailsResult;
import com.android.billingclient.api.PendingPurchasesParams;
import com.android.billingclient.api.AcknowledgePurchaseParams;
import com.android.billingclient.api.AcknowledgePurchaseResponseListener;

public class MainActivity extends Activity {
    static volatile MainActivity instance;
    static final int REQ_FILE = 11, REQ_NOTIF = 12;
    static final String NOTIF_PERM = "android.permission.POST_NOTIFICATIONS";
    static final String SKU_MONTHLY = "premium_monthly";
    static final String SKU_YEARLY = "premium_yearly";
    static final String RC_API_KEY = "goog_vlQVUfcpFuYHiAhJkKtyEJaTAaV";
    private WebView web;
    private ValueCallback<Uri[]> filePick;
    private BillingClient billingClient;
    private ProductDetails monthlyDetails;
    private ProductDetails yearlyDetails;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        instance = this;
        Window w = getWindow();
        w.setStatusBarColor(Color.parseColor("#F7EDDF"));
        w.setNavigationBarColor(Color.parseColor("#FFF9F0"));
        int flags = View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
        if (Build.VERSION.SDK_INT >= 26) flags |= View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
        w.getDecorView().setSystemUiVisibility(flags);

        web = new WebView(this);
        web.setBackgroundColor(Color.parseColor("#F7EDDF"));
        setContentView(web);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setTextZoom(100);
        web.addJavascriptInterface(new Bridge(), "AndroidApp");
        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> cb, FileChooserParams p) {
                if (filePick != null) { try { filePick.onReceiveValue(null); } catch (Exception e) { } }
                filePick = cb;
                try {
                    Intent i = new Intent(Intent.ACTION_GET_CONTENT);
                    i.addCategory(Intent.CATEGORY_OPENABLE);
                    i.setType("*/*");
                    startActivityForResult(Intent.createChooser(i, "Backup file"), REQ_FILE);
                } catch (Exception e) {
                    filePick = null;
                    try { cb.onReceiveValue(null); } catch (Exception e2) { }
                }
                return true;
            }
        });
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
                String u = r.getUrl().toString();
                if (u.startsWith("file:")) return false;
                try { startActivity(new Intent(Intent.ACTION_VIEW, r.getUrl())); } catch (Exception e) { }
                return true;
            }
        });
        try { ReminderReceiver.scheduleAll(this); } catch (Exception e) { }
        setupBilling();

        if (state != null) web.restoreState(state);
        else web.loadUrl("file:///android_asset/www/index.html");
    }

    /** Run a line of JavaScript in the app page (safe from any thread). */
    static void js(final String code) {
        final MainActivity a = instance;
        if (a == null) return;
        a.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                try { if (a.web != null) a.web.evaluateJavascript(code, null); } catch (Exception e) { }
            }
        });
    }

    private boolean notifAllowed() {
        try {
            if (Build.VERSION.SDK_INT >= 33 && checkSelfPermission(NOTIF_PERM) != PackageManager.PERMISSION_GRANTED) return false;
            NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            return nm == null || nm.areNotificationsEnabled();
        } catch (Exception e) { return true; }
    }

    private void openNotifSettings() {
        try {
            Intent i;
            if (Build.VERSION.SDK_INT >= 26) {
                i = new Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS);
                i.putExtra(Settings.EXTRA_APP_PACKAGE, getPackageName());
            } else {
                i = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                i.setData(Uri.parse("package:" + getPackageName()));
            }
            startActivity(i);
        } catch (Exception e) { }
    }

    private void openAppDetails() {
        try {
            Intent i = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
            i.setData(Uri.parse("package:" + getPackageName()));
            startActivity(i);
        } catch (Exception e) { }
    }

    /** Puts a PNG into the phone gallery (Android 10+). Returns its address, or null when not possible. */
    private Uri galleryInsert(byte[] png) {
        if (Build.VERSION.SDK_INT < 29) return null;
        try {
            ContentValues v = new ContentValues();
            v.put(MediaStore.MediaColumns.DISPLAY_NAME, "affirmation-" + System.currentTimeMillis() + ".png");
            v.put(MediaStore.MediaColumns.MIME_TYPE, "image/png");
            v.put(MediaStore.MediaColumns.RELATIVE_PATH, "Pictures/Hooponopono");
            Uri u = getContentResolver().insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, v);
            if (u == null) return null;
            OutputStream o = getContentResolver().openOutputStream(u);
            if (o == null) return null;
            o.write(png);
            o.close();
            return u;
        } catch (Exception e) { return null; }
    }

    private File tmpFile(String name) {
        File dir = new File(getCacheDir(), "share");
        if (!dir.exists()) dir.mkdirs();
        return new File(dir, name.replaceAll("[^A-Za-z0-9._-]", "_"));
    }

    private void send(final Uri uri, String mime, String text) {
        final Intent i = new Intent(Intent.ACTION_SEND);
        i.setType(mime);
        i.putExtra(Intent.EXTRA_STREAM, uri);
        if (text != null && text.length() > 0) i.putExtra(Intent.EXTRA_TEXT, text);
        i.setClipData(ClipData.newRawUri("", uri));
        i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                try {
                    List<ResolveInfo> targets = getPackageManager().queryIntentActivities(i, PackageManager.MATCH_DEFAULT_ONLY);
                    if (targets != null) {
                        for (ResolveInfo r : targets) {
                            try { grantUriPermission(r.activityInfo.packageName, uri, Intent.FLAG_GRANT_READ_URI_PERMISSION); } catch (Exception e) { }
                        }
                    }
                } catch (Exception e) { }
                try {
                    Intent c = Intent.createChooser(i, null);
                    c.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    startActivity(c);
                } catch (Exception e) {
                    js("window.__shareFailed&&window.__shareFailed()");
                }
            }
        });
    }

    public class Bridge {
        @JavascriptInterface
        public void purchase(final String sku) { launchPurchase(sku); }

        @JavascriptInterface
        public void restorePurchases() { restorePurchasesInternal(); }

        @JavascriptInterface
        public boolean canNotify() { return notifAllowed(); }

        @JavascriptInterface
        public void askNotify(final boolean force) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try {
                        if (notifAllowed()) return;
                        SharedPreferences sp = getSharedPreferences(ReminderReceiver.PREF, MODE_PRIVATE);
                        boolean asked = sp.getBoolean("askedNotif", false);
                        if (Build.VERSION.SDK_INT >= 33 && checkSelfPermission(NOTIF_PERM) != PackageManager.PERMISSION_GRANTED
                                && (!asked || shouldShowRequestPermissionRationale(NOTIF_PERM))) {
                            sp.edit().putBoolean("askedNotif", true).apply();
                            requestPermissions(new String[]{NOTIF_PERM}, REQ_NOTIF);
                        } else if (force) {
                            openNotifSettings();
                        }
                    } catch (Exception e) { }
                }
            });
        }

        @JavascriptInterface
        public void setReminders(String json) {
            try {
                getSharedPreferences(ReminderReceiver.PREF, MODE_PRIVATE).edit().putString(ReminderReceiver.KEY, json == null ? "[]" : json).apply();
                ReminderReceiver.scheduleAll(MainActivity.this);
            } catch (Exception e) { }
        }

        @JavascriptInterface
        public void media(boolean playing, String title, String sub, double posMs, double durMs, boolean multi, String art) {
            try {
                PlaybackService.set(playing, title, sub, (long) posMs, (long) durMs, multi, art);
                PlaybackService.wanted = true;
                PlaybackService svc = PlaybackService.instance;
                if (svc != null) {
                    svc.refreshLater();
                } else if (playing) {
                    Intent i = new Intent(MainActivity.this, PlaybackService.class);
                    if (Build.VERSION.SDK_INT >= 26) startForegroundService(i); else startService(i);
                }
            } catch (Exception e) { }
        }

        @JavascriptInterface
        public void mediaStop() {
            try {
                PlaybackService.playing = false;
                PlaybackService.wanted = false;
                PlaybackService svc = PlaybackService.instance;
                if (svc != null) svc.refreshLater();
            } catch (Exception e) { }
        }

        @JavascriptInterface
        public void shareImage(String base64Png, String text) {
            try {
                byte[] png = Base64.decode(base64Png, Base64.DEFAULT);
                Uri uri = galleryInsert(png);
                if (uri == null) {
                    File f = tmpFile("affirmation.png");
                    FileOutputStream o = new FileOutputStream(f);
                    o.write(png);
                    o.close();
                    uri = ShareProvider.uriFor(f.getName());
                }
                send(uri, "image/png", text);
            } catch (Exception e) {
                js("window.__shareFailed&&window.__shareFailed()");
            }
        }

        @JavascriptInterface
        public void shareFile(String name, String text) {
            try {
                File f = tmpFile(name);
                FileOutputStream o = new FileOutputStream(f);
                o.write(text.getBytes("UTF-8"));
                o.close();
                send(ShareProvider.uriFor(f.getName()), "application/json", null);
            } catch (Exception e) { }
        }

        /** Saves the picture into Pictures/Hooponopono. Returns "ok" or "". */
        @JavascriptInterface
        public String saveImage(String base64Png) {
            try { return galleryInsert(Base64.decode(base64Png, Base64.DEFAULT)) != null ? "ok" : ""; }
            catch (Exception e) { return ""; }
        }

        @JavascriptInterface
        public void testNotify(String title, String body) {
            try { ReminderReceiver.showNow(MainActivity.this, title, body); } catch (Exception e) { }
        }

        @JavascriptInterface
        public boolean canExact() {
            try {
                if (Build.VERSION.SDK_INT < 31) return true;
                AlarmManager am = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
                return am == null || am.canScheduleExactAlarms();
            } catch (Exception e) { return true; }
        }

        @JavascriptInterface
        public void askExact() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try {
                        if (Build.VERSION.SDK_INT >= 31) {
                            Intent i = new Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM);
                            i.setData(Uri.parse("package:" + getPackageName()));
                            startActivity(i);
                        }
                    } catch (Exception e) { openAppDetails(); }
                }
            });
        }

        @JavascriptInterface
        public void openAppSettings() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() { openAppDetails(); }
            });
        }

        /** Saves into the phone's Downloads folder. Returns "ok" or "" when that is not possible on this Android version. */
        @JavascriptInterface
        public String saveFile(String name, String text) {
            if (Build.VERSION.SDK_INT < 29) return "";
            try {
                ContentValues v = new ContentValues();
                v.put(MediaStore.MediaColumns.DISPLAY_NAME, name.replaceAll("[^A-Za-z0-9._-]", "_"));
                v.put(MediaStore.MediaColumns.MIME_TYPE, "application/json");
                v.put(MediaStore.MediaColumns.RELATIVE_PATH, "Download");
                Uri u = getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, v);
                if (u == null) return "";
                OutputStream o = getContentResolver().openOutputStream(u);
                if (o == null) return "";
                o.write(text.getBytes("UTF-8"));
                o.close();
                return "ok";
            } catch (Exception e) { return ""; }
        }
    }

    @Override
    protected void onActivityResult(int req, int result, Intent data) {
        super.onActivityResult(req, result, data);
        if (req == REQ_FILE && filePick != null) {
            Uri[] out = null;
            if (result == RESULT_OK && data != null && data.getData() != null) out = new Uri[]{data.getData()};
            try { filePick.onReceiveValue(out); } catch (Exception e) { }
            filePick = null;
        }
    }

    @Override
    public void onRequestPermissionsResult(int req, String[] perms, int[] results) {
        super.onRequestPermissionsResult(req, perms, results);
        if (req == REQ_NOTIF) {
            try { ReminderReceiver.scheduleAll(this); } catch (Exception e) { }
            js("window.__notifChanged&&window.__notifChanged()");
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        try { ReminderReceiver.scheduleAll(this); } catch (Exception e) { }
        js("window.__notifChanged&&window.__notifChanged()");
    }

    @Override
    public void onBackPressed() {
        web.evaluateJavascript("(window.__androidBack && window.__androidBack()) ? '1' : '0'", new ValueCallback<String>() {
            @Override
            public void onReceiveValue(String r) {
                if ("\"1\"".equals(r)) return;
                if (PlaybackService.instance != null && PlaybackService.playing) moveTaskToBack(true);
                else finish();
            }
        });
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        web.saveState(out);
    }

    @Override
    protected void onDestroy() {
        try { stopService(new Intent(this, PlaybackService.class)); } catch (Exception e) { }
        if (instance == this) instance = null;
        if (billingClient != null) { try { billingClient.endConnection(); } catch (Exception e) { } }
        if (web != null) { web.destroy(); web = null; }
        super.onDestroy();
    }

    private void setupBilling() {
        billingClient = BillingClient.newBuilder(this)
            .setListener(new PurchasesUpdatedListener() {
                @Override
                public void onPurchasesUpdated(BillingResult result, List<Purchase> purchases) {
                    if (result.getResponseCode() == BillingClient.BillingResponseCode.OK && purchases != null) {
                        for (Purchase p : purchases) handlePurchase(p);
                    } else if (result.getResponseCode() == BillingClient.BillingResponseCode.USER_CANCELED) {
                        js("window.__purchaseCancelled&&window.__purchaseCancelled()");
                    } else {
                        js("window.__purchaseFailed&&window.__purchaseFailed(" + result.getResponseCode() + ")");
                    }
                }
            })
            .enablePendingPurchases(PendingPurchasesParams.newBuilder().enableOneTimeProducts().build())
            .build();

        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(BillingResult result) {
                if (result.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    queryProducts();
                    restorePurchasesInternal();
                }
            }
            @Override
            public void onBillingServiceDisconnected() { }
        });
    }

    private void queryProducts() {
        List<QueryProductDetailsParams.Product> productList = new ArrayList<QueryProductDetailsParams.Product>();
        productList.add(QueryProductDetailsParams.Product.newBuilder()
            .setProductId(SKU_MONTHLY)
            .setProductType(BillingClient.ProductType.SUBS)
            .build());
        productList.add(QueryProductDetailsParams.Product.newBuilder()
            .setProductId(SKU_YEARLY)
            .setProductType(BillingClient.ProductType.SUBS)
            .build());
        QueryProductDetailsParams params = QueryProductDetailsParams.newBuilder()
            .setProductList(productList)
            .build();
        billingClient.queryProductDetailsAsync(params, new ProductDetailsResponseListener() {
            @Override
            public void onProductDetailsResponse(BillingResult result, QueryProductDetailsResult queryResult) {
                if (result.getResponseCode() != BillingClient.BillingResponseCode.OK) return;
                for (ProductDetails d : queryResult.getProductDetailsList()) {
                    if (SKU_MONTHLY.equals(d.getProductId())) monthlyDetails = d;
                    if (SKU_YEARLY.equals(d.getProductId())) yearlyDetails = d;
                }
            }
        });
    }

    private void handlePurchase(Purchase purchase) {
        if (purchase.getPurchaseState() == Purchase.PurchaseState.PURCHASED) {
            if (!purchase.isAcknowledged()) {
                AcknowledgePurchaseParams params = AcknowledgePurchaseParams.newBuilder()
                    .setPurchaseToken(purchase.getPurchaseToken())
                    .build();
                billingClient.acknowledgePurchase(params, new AcknowledgePurchaseResponseListener() {
                    @Override
                    public void onAcknowledgePurchaseResponse(BillingResult r) { }
                });
            }
            String productId = purchase.getProducts().isEmpty() ? SKU_MONTHLY : purchase.getProducts().get(0);
            sendToRevenueCat(purchase.getPurchaseToken(), productId, false);
            js("window.__purchaseSuccess&&window.__purchaseSuccess()");
        }
    }

    private String getUserId() {
        SharedPreferences prefs = getSharedPreferences("hoo.rc", MODE_PRIVATE);
        String id = prefs.getString("uid", null);
        if (id == null) {
            id = UUID.randomUUID().toString();
            prefs.edit().putString("uid", id).apply();
        }
        return id;
    }

    private void sendToRevenueCat(final String purchaseToken, final String productId, final boolean isRestore) {
        if (RC_API_KEY.startsWith("YOUR_")) return;
        final String userId = getUserId();
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    URL url = new URL("https://api.revenuecat.com/v1/receipts");
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("POST");
                    conn.setRequestProperty("Content-Type", "application/json");
                    conn.setRequestProperty("Authorization", "Bearer " + RC_API_KEY);
                    conn.setRequestProperty("X-Platform", "android");
                    conn.setDoOutput(true);
                    conn.setConnectTimeout(10000);
                    conn.setReadTimeout(10000);
                    String body = "{\"app_user_id\":\"" + userId + "\",\"fetch_token\":\"" + purchaseToken + "\",\"product_id\":\"" + productId + "\",\"is_restore\":" + isRestore + "}";
                    byte[] bytes = body.getBytes("UTF-8");
                    OutputStream os = conn.getOutputStream();
                    os.write(bytes);
                    os.flush();
                    os.close();
                    conn.getResponseCode();
                    conn.disconnect();
                } catch (Exception e) { /* silent — RC is analytics only */ }
            }
        }).start();
    }

    private void restorePurchasesInternal() {
        QueryPurchasesParams params = QueryPurchasesParams.newBuilder()
            .setProductType(BillingClient.ProductType.SUBS)
            .build();
        billingClient.queryPurchasesAsync(params, new PurchasesResponseListener() {
            @Override
            public void onQueryPurchasesResponse(BillingResult result, List<Purchase> purchases) {
                boolean active = false;
                if (result.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    for (Purchase p : purchases) {
                        if (p.getPurchaseState() == Purchase.PurchaseState.PURCHASED) {
                            active = true;
                            String pid = p.getProducts().isEmpty() ? SKU_MONTHLY : p.getProducts().get(0);
                            sendToRevenueCat(p.getPurchaseToken(), pid, true);
                            break;
                        }
                    }
                }
                final boolean isPremium = active;
                js("window.__billingRestore&&window.__billingRestore(" + isPremium + ")");
            }
        });
    }

    /* Called from Bridge */
    void launchPurchase(final String sku) {
        launchPurchaseWithRetry(sku, 0);
    }

    void launchPurchaseWithRetry(final String sku, final int attempt) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                ProductDetails details = SKU_MONTHLY.equals(sku) ? monthlyDetails : yearlyDetails;
                if (details == null) {
                    if (attempt >= 5) {
                        js("window.__purchaseFailed&&window.__purchaseFailed(-1)");
                        return;
                    }
                    if (attempt == 0) {
                        js("window.__purchaseRetrying&&window.__purchaseRetrying()");
                        queryProducts();
                    }
                    new android.os.Handler().postDelayed(new Runnable() {
                        @Override public void run() { launchPurchaseWithRetry(sku, attempt + 1); }
                    }, 2000);
                    return;
                }
                List<ProductDetails.SubscriptionOfferDetails> offers = details.getSubscriptionOfferDetails();
                if (offers == null || offers.isEmpty()) { js("window.__purchaseFailed&&window.__purchaseFailed(-2)"); return; }
                // Prefer the offer that includes a free trial phase
                String offerToken = offers.get(0).getOfferToken();
                for (int i = 0; i < offers.size(); i++) {
                    List<ProductDetails.PricingPhase> phases = offers.get(i).getPricingPhases().getPricingPhaseList();
                    for (int j = 0; j < phases.size(); j++) {
                        if (phases.get(j).getPriceAmountMicros() == 0) {
                            offerToken = offers.get(i).getOfferToken();
                            break;
                        }
                    }
                }
                List<BillingFlowParams.ProductDetailsParams> pdList = new ArrayList<BillingFlowParams.ProductDetailsParams>();
                pdList.add(BillingFlowParams.ProductDetailsParams.newBuilder()
                    .setProductDetails(details)
                    .setOfferToken(offerToken)
                    .build());
                BillingFlowParams fp = BillingFlowParams.newBuilder()
                    .setProductDetailsParamsList(pdList)
                    .build();
                billingClient.launchBillingFlow(MainActivity.this, fp);
            }
        });
    }
}
