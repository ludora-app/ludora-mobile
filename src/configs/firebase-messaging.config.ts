// Register background handler - must be at top level, outside of any component
try {
  const firebaseMessaging = require('@react-native-firebase/messaging');
  const { getMessaging } = firebaseMessaging;
  const { setBackgroundMessageHandler } = firebaseMessaging;

  const messaging = getMessaging();
  setBackgroundMessageHandler(messaging, async (remoteMessage: any) => {
    console.log('🔔 Message handled in the background!', remoteMessage);
  });
} catch (e) {
  console.log('Firebase messaging background handler not available (iOS)');
}
