const { withAndroidManifest } = require("expo/config-plugins");

function withAndroidManifestFixes(config) {
  return withAndroidManifest(config, async (cfg) => {
    const manifest = cfg.modResults.manifest;
    const application = manifest.application?.[0];

    if (!application) return cfg;

    manifest.$ = manifest.$ || {};
    manifest.$["xmlns:tools"] = "http://schemas.android.com/tools";

    application.$["android:usesCleartextTraffic"] = "true";
    application.$["tools:targetApi"] = "28";
    application.$["tools:ignore"] = "GoogleAppIndexingWarning";
    application.$["tools:replace"] = "android:usesCleartextTraffic";

    const metaData = application["meta-data"] || [];
    const firebaseColorMeta = metaData.find(
      (m) =>
        m.$["android:name"] ===
        "com.google.firebase.messaging.default_notification_color"
    );

    if (firebaseColorMeta) {
      firebaseColorMeta.$["tools:replace"] = "android:resource";
    }

    return cfg;
  });
}

module.exports = withAndroidManifestFixes;
