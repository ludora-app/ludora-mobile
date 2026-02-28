const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function withFirebaseMessaging(config) {
  return withAndroidManifest(config, modConfig => {
    const manifest = modConfig.modResults;

    if (!manifest.manifest?.application?.[0]) {
      return modConfig;
    }

    const mainApplication = manifest.manifest.application[0];

    const metaData = [
      {
        $: {
          'android:name': 'com.google.firebase.messaging.default_notification_channel_id',
          'android:value': 'default',
          'tools:replace': 'android:value',
        },
      },
    ];

    mainApplication['meta-data'] = [...(mainApplication['meta-data'] || []), ...metaData];

    manifest.manifest.$ = {
      ...manifest.manifest.$,
      'xmlns:tools': 'http://schemas.android.com/tools',
    };

    return modConfig;
  });
};
