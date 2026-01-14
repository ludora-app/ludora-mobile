import messaging from '@react-native-firebase/messaging';

// Register background handler - must be at top level, outside of any component
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('🔔 Message handled in the background!', remoteMessage);
});
