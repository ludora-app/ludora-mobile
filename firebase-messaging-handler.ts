// Register background handler - must be at top level, outside of any component
try {
  const messaging = require('@react-native-firebase/messaging').default;
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('🔔 Message handled in the background!', remoteMessage);
  });
} catch (e) {
  console.log('Firebase messaging background handler not available (iOS)');
}
