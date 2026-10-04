package com.hooponopono.healing;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.Icon;
import android.media.MediaMetadata;
import android.media.session.MediaSession;
import android.media.session.PlaybackState;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.os.PowerManager;
import android.os.SystemClock;
import java.io.InputStream;

/** Keeps music playing with the screen off and shows play / pause / next / previous on the lock screen and in the notification shade. */
public class PlaybackService extends Service {
    static volatile PlaybackService instance;
    static volatile boolean playing;
    static volatile boolean wanted;
    static volatile String title = "", sub = "", art = "";
    static volatile long pos, dur;
    static volatile boolean multi;
    static final String CH = "playback";
    static final String A_PLAY = "hoo.PLAY", A_PAUSE = "hoo.PAUSE", A_NEXT = "hoo.NEXT", A_PREV = "hoo.PREV", A_STOP = "hoo.STOP";
    private static final int ID = 7;

    private MediaSession session;
    private PowerManager.WakeLock wake;
    private final Handler main = new Handler(Looper.getMainLooper());
    private String artLoaded = null;
    private Bitmap artBmp = null;
    private final Runnable refresh = new Runnable() {
        @Override
        public void run() {
            if (!wanted) { stopForegroundCompat(); stopSelf(); return; }
            try { apply(); } catch (Exception e) { }
        }
    };

    static void set(boolean p, String t, String s, long po, long du, boolean m, String a) {
        playing = p; title = t == null ? "" : t; sub = s == null ? "" : s; pos = po; dur = du; multi = m; art = a == null ? "" : a;
    }

    void refreshLater() { main.removeCallbacks(refresh); main.post(refresh); }

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            if (nm != null && nm.getNotificationChannel(CH) == null) {
                NotificationChannel ch = new NotificationChannel(CH, "Music player", NotificationManager.IMPORTANCE_LOW);
                ch.setShowBadge(false);
                nm.createNotificationChannel(ch);
            }
        }
        session = new MediaSession(this, "hooponopono");
        session.setFlags(MediaSession.FLAG_HANDLES_MEDIA_BUTTONS | MediaSession.FLAG_HANDLES_TRANSPORT_CONTROLS);
        session.setCallback(new MediaSession.Callback() {
            @Override public void onPlay() { MainActivity.js("window.__media&&window.__media('play')"); }
            @Override public void onPause() { MainActivity.js("window.__media&&window.__media('pause')"); }
            @Override public void onStop() { MainActivity.js("window.__media&&window.__media('pause')"); }
            @Override public void onSkipToNext() { MainActivity.js("window.__media&&window.__media('next')"); }
            @Override public void onSkipToPrevious() { MainActivity.js("window.__media&&window.__media('prev')"); }
            @Override public void onSeekTo(long p) { MainActivity.js("window.__media&&window.__media('seek'," + p + ")"); }
        });
        session.setActive(true);
        try {
            PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
            if (pm != null) { wake = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "hooponopono:playback"); wake.setReferenceCounted(false); }
        } catch (Exception e) { }
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        String a = intent == null ? null : intent.getAction();
        try { apply(); } catch (Exception e) { }
        if (A_PLAY.equals(a)) MainActivity.js("window.__media&&window.__media('play')");
        else if (A_PAUSE.equals(a)) MainActivity.js("window.__media&&window.__media('pause')");
        else if (A_NEXT.equals(a)) MainActivity.js("window.__media&&window.__media('next')");
        else if (A_PREV.equals(a)) MainActivity.js("window.__media&&window.__media('prev')");
        else if (A_STOP.equals(a)) {
            MainActivity.js("window.__media&&window.__media('stop')");
            playing = false;
            wanted = false;
        }
        if (MainActivity.instance == null || !wanted) { stopForegroundCompat(); stopSelf(); }
        return START_NOT_STICKY;
    }

    private void stopForegroundCompat() {
        try { if (Build.VERSION.SDK_INT >= 24) stopForeground(Service.STOP_FOREGROUND_REMOVE); else stopForeground(true); } catch (Exception e) { }
    }

    private PendingIntent action(String a, int code) {
        Intent i = new Intent(this, PlaybackService.class);
        i.setAction(a);
        return PendingIntent.getService(this, code, i, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    private Notification.Action act(int icon, String label, String a, int code) {
        return new Notification.Action.Builder(Icon.createWithResource(this, icon), label, action(a, code)).build();
    }

    private Bitmap artwork() {
        String a = art;
        if (a.length() == 0 || !a.matches("[A-Za-z0-9_]+")) return null;
        if (a.equals(artLoaded)) return artBmp;
        artLoaded = a; artBmp = null;
        try {
            InputStream in = getAssets().open("www/img/" + a + ".webp");
            BitmapFactory.Options o = new BitmapFactory.Options();
            o.inSampleSize = 2;
            artBmp = BitmapFactory.decodeStream(in, null, o);
            in.close();
        } catch (Exception e) { }
        return artBmp;
    }

    /** Push the current state to the lock screen, the notification and the wake lock. Main thread only. */
    private void apply() {
        boolean p = playing;
        Bitmap bmp = artwork();
        MediaMetadata.Builder md = new MediaMetadata.Builder()
            .putString(MediaMetadata.METADATA_KEY_TITLE, title)
            .putString(MediaMetadata.METADATA_KEY_ARTIST, sub)
            .putLong(MediaMetadata.METADATA_KEY_DURATION, dur > 0 ? dur : -1L);
        if (bmp != null) md.putBitmap(MediaMetadata.METADATA_KEY_ALBUM_ART, bmp);
        session.setMetadata(md.build());
        long acts = PlaybackState.ACTION_PLAY | PlaybackState.ACTION_PAUSE | PlaybackState.ACTION_PLAY_PAUSE | PlaybackState.ACTION_SEEK_TO | PlaybackState.ACTION_STOP;
        if (multi) acts |= PlaybackState.ACTION_SKIP_TO_NEXT | PlaybackState.ACTION_SKIP_TO_PREVIOUS;
        session.setPlaybackState(new PlaybackState.Builder().setActions(acts)
            .setState(p ? PlaybackState.STATE_PLAYING : PlaybackState.STATE_PAUSED, pos, p ? 1f : 0f, SystemClock.elapsedRealtime()).build());

        Intent open = new Intent(this, MainActivity.class);
        open.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pi = PendingIntent.getActivity(this, 1, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        Notification.Builder b = Build.VERSION.SDK_INT >= 26 ? new Notification.Builder(this, CH) : new Notification.Builder(this);
        b.setSmallIcon(R.drawable.ic_stat).setColor(0xFFB1563A).setContentTitle(title).setContentText(sub).setContentIntent(pi)
            .setVisibility(Notification.VISIBILITY_PUBLIC).setOnlyAlertOnce(true).setShowWhen(false).setOngoing(p)
            .setDeleteIntent(action(A_STOP, 15));
        if (bmp != null) b.setLargeIcon(bmp);
        int n = 0, playIdx;
        if (multi) { b.addAction(act(R.drawable.ic_prev, "Previous", A_PREV, 11)); n++; }
        playIdx = n;
        b.addAction(p ? act(R.drawable.ic_pause, "Pause", A_PAUSE, 12) : act(R.drawable.ic_play, "Play", A_PLAY, 13)); n++;
        if (multi) { b.addAction(act(R.drawable.ic_next, "Next", A_NEXT, 14)); n++; }
        b.addAction(act(R.drawable.ic_close, "Close", A_STOP, 15));
        Notification.MediaStyle st = new Notification.MediaStyle().setMediaSession(session.getSessionToken());
        if (multi) st.setShowActionsInCompactView(0, 1, 2); else st.setShowActionsInCompactView(playIdx, playIdx + 1);
        b.setStyle(st);
        Notification notif = b.build();
        try {
            if (Build.VERSION.SDK_INT >= 29) startForeground(ID, notif, ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK);
            else startForeground(ID, notif);
        } catch (Exception e) {
            try {
                NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
                if (nm != null) nm.notify(ID, notif);
            } catch (Exception e2) { }
        }
        try {
            if (wake != null) {
                if (p) wake.acquire(3 * 60 * 60 * 1000L);
                else if (wake.isHeld()) wake.release();
            }
        } catch (Exception e) { }
    }

    @Override
    public void onTaskRemoved(Intent rootIntent) {
        MainActivity.js("window.__media&&window.__media('stop')");
        playing = false;
        stopForegroundCompat();
        stopSelf();
        super.onTaskRemoved(rootIntent);
    }

    @Override
    public void onDestroy() {
        instance = null;
        main.removeCallbacks(refresh);
        try { if (wake != null && wake.isHeld()) wake.release(); } catch (Exception e) { }
        try { if (session != null) { session.setActive(false); session.release(); } } catch (Exception e) { }
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) { return null; }
}
