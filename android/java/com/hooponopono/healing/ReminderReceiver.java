package com.hooponopono.healing;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import java.util.Calendar;
import org.json.JSONArray;
import org.json.JSONObject;

/** Daily reminders: one alarm per reminder, re-armed every time it fires and after a restart. */
public class ReminderReceiver extends BroadcastReceiver {
    static final String PREF = "hoo", KEY = "reminders", CH = "reminders2", ACTION = "com.hooponopono.healing.REMIND";

    @Override
    public void onReceive(Context c, Intent intent) {
        try {
            if (intent != null && ACTION.equals(intent.getAction())) show(c, intent.getStringExtra("id"));
        } catch (Exception e) { }
        try { scheduleAll(c); } catch (Exception e) { }
    }

    private static JSONArray list(Context c) {
        try { return new JSONArray(c.getSharedPreferences(PREF, Context.MODE_PRIVATE).getString(KEY, "[]")); }
        catch (Exception e) { return new JSONArray(); }
    }

    private static PendingIntent pending(Context c, String id, int n) {
        Intent i = new Intent(c, ReminderReceiver.class);
        i.setAction(ACTION);
        i.setData(Uri.parse("hoo://reminder/" + id));
        i.putExtra("id", id);
        return PendingIntent.getBroadcast(c, 100 + n, i, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    static void scheduleAll(Context c) {
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;
        JSONArray a = list(c);
        for (int n = 0; n < a.length(); n++) {
            try {
                JSONObject o = a.getJSONObject(n);
                String id = o.optString("id", "r" + n);
                PendingIntent pi = pending(c, id, n);
                am.cancel(pi);
                if (!o.optBoolean("on", false)) continue;
                String[] hm = o.optString("t", "09:00").split(":");
                Calendar cal = Calendar.getInstance();
                cal.set(Calendar.HOUR_OF_DAY, Integer.parseInt(hm[0]));
                cal.set(Calendar.MINUTE, Integer.parseInt(hm[1]));
                cal.set(Calendar.SECOND, 0);
                cal.set(Calendar.MILLISECOND, 0);
                if (cal.getTimeInMillis() <= System.currentTimeMillis() + 30000L) cal.add(Calendar.DAY_OF_YEAR, 1);
                boolean exact = false;
                try { exact = Build.VERSION.SDK_INT < 31 || am.canScheduleExactAlarms(); } catch (Exception e) { }
                try {
                    if (exact) am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, cal.getTimeInMillis(), pi);
                    else am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, cal.getTimeInMillis(), pi);
                } catch (Exception e) {
                    try { am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, cal.getTimeInMillis(), pi); }
                    catch (Exception e2) { am.set(AlarmManager.RTC_WAKEUP, cal.getTimeInMillis(), pi); }
                }
            } catch (Exception e) { }
        }
    }

    static void channel(Context c) {
        if (Build.VERSION.SDK_INT < 26) return;
        NotificationManager nm = (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null || nm.getNotificationChannel(CH) != null) return;
        NotificationChannel ch = new NotificationChannel(CH, "Reminders", NotificationManager.IMPORTANCE_HIGH);
        ch.setDescription("Daily mantra, journal and practice reminders");
        nm.createNotificationChannel(ch);
    }

    static void post(Context c, int nid, String title, String body) {
        NotificationManager nm = (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null) return;
        channel(c);
        Intent open = new Intent(c, MainActivity.class);
        open.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pi = PendingIntent.getActivity(c, 0, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        Notification.Builder b = Build.VERSION.SDK_INT >= 26 ? new Notification.Builder(c, CH) : new Notification.Builder(c);
        if (body == null) body = "";
        b.setSmallIcon(R.drawable.ic_stat)
            .setColor(0xFFB1563A)
            .setContentTitle(title == null || title.length() == 0 ? "Ho'oponopono" : title)
            .setContentText(body)
            .setStyle(new Notification.BigTextStyle().bigText(body))
            .setContentIntent(pi)
            .setAutoCancel(true);
        if (Build.VERSION.SDK_INT < 26) b.setPriority(Notification.PRIORITY_HIGH).setDefaults(Notification.DEFAULT_ALL);
        nm.notify(nid, b.build());
    }

    static void showNow(Context c, String title, String body) { post(c, 199, title, body); }

    private static void show(Context c, String id) throws Exception {
        if (id == null) return;
        JSONArray a = list(c);
        for (int n = 0; n < a.length(); n++) {
            JSONObject o = a.getJSONObject(n);
            if (!id.equals(o.optString("id")) || !o.optBoolean("on", false)) continue;
            post(c, 200 + n, o.optString("title", ""), o.optString("body", ""));
            return;
        }
    }
}
