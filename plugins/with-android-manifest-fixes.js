const { withAndroidManifest } = require('expo/config-plugins');

const FIREBASE_COLOR_META_NAME = 'com.google.firebase.messaging.default_notification_color';

function withAndroidManifestFixes(config) {
  return withAndroidManifest(config, async cfg => {
    const { manifest } = cfg.modResults;
    const application = manifest.application?.[0];

    if (!application) return cfg;

    manifest.$ = manifest.$ || {};
    manifest.$['xmlns:tools'] = 'http://schemas.android.com/tools';

    application.$['android:usesCleartextTraffic'] = 'true';
    application.$['tools:targetApi'] = '28';
    application.$['tools:ignore'] = 'GoogleAppIndexingWarning';
    application.$['tools:replace'] = 'android:usesCleartextTraffic';

    const metaData = application['meta-data'] || [];
    const others = metaData.filter(
      m => m.$ && m.$['android:name'] !== FIREBASE_COLOR_META_NAME,
    );
    const existingColor = metaData.find(
      m => m.$ && m.$['android:name'] === FIREBASE_COLOR_META_NAME,
    );
    const resource = existingColor?.$?.['android:resource'] || '@color/notification_icon_color';

    application['meta-data'] = [
      ...others,
      {
        $: {
          'android:name': FIREBASE_COLOR_META_NAME,
          'android:resource': resource,
          'tools:replace': 'android:resource',
        },
      },
    ];

    return cfg;
  });
}

module.exports = withAndroidManifestFixes;
