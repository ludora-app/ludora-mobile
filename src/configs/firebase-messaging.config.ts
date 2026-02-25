// Register background handler - must be at top level, outside of any component
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, global-require
  const firebaseMessaging = require('@react-native-firebase/messaging');
  const { getMessaging } = firebaseMessaging;
  const { setBackgroundMessageHandler } = firebaseMessaging;

  const messaging = getMessaging();
  setBackgroundMessageHandler(messaging, async () => {});
} catch (e) {
  // eslint-disable-next-line no-console
  console.warn('Firebase messaging background handler not available (iOS)', e);
}
