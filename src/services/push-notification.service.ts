import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Import Firebase Messaging modular API
let getMessaging: any = null;
let getToken: any = null;
let onMessage: any = null;
let getInitialNotification: any = null;
let onNotificationOpenedApp: any = null;
let deleteToken: any = null;
let AuthorizationStatus: any = null;
let requestPermission: any = null;
let onTokenRefresh: any = null;

try {
  const firebaseMessaging = require('@react-native-firebase/messaging');
  getMessaging = firebaseMessaging.getMessaging;
  getToken = firebaseMessaging.getToken;
  onMessage = firebaseMessaging.onMessage;
  getInitialNotification = firebaseMessaging.getInitialNotification;
  onNotificationOpenedApp = firebaseMessaging.onNotificationOpenedApp;
  deleteToken = firebaseMessaging.deleteToken;
  AuthorizationStatus = firebaseMessaging.AuthorizationStatus;
  requestPermission = firebaseMessaging.requestPermission;
  onTokenRefresh = firebaseMessaging.onTokenRefresh;
} catch (e) {
  console.warn('Firebase messaging not available:', e);
}

/**
 * Service to handle push notifications using Firebase Cloud Messaging
 */
class PushNotificationService {
  private fcmToken: string | null = null;

  private unsubscribeOnMessage?: () => void;

  private unsubscribeOnNotificationOpenedApp?: () => void;

  private unsubscribeOnTokenRefresh?: () => void;

  /**
   * Initialize push notification service
   * - Requests permissions
   * - Gets FCM token
   * - Sets up notification handlers
   */
  async initialize() {
    try {
      // Configure notification handler for foreground notifications
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldPlaySound: true,
          shouldSetBadge: true,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });

      // Request permission
      const hasPermission = await this.requestPermission();
      if (!hasPermission) {
        console.warn('⚠️ Push notification permission denied');
        return null;
      }

      // Setup Android notification channel
      if (Platform.OS === 'android') {
        await this.setupAndroidChannel();
      }

      // Get FCM token
      const token = await this.getFCMToken();
      if (token) {
        console.log('✅ Push notification service initialized with token:', token);
      }

      // Setup message handlers
      this.setupMessageHandlers();

      // Check if app was opened from a notification
      await this.checkInitialNotification();

      return token;
    } catch (error) {
      console.error('❌ Error initializing push notification service:', error);
      return null;
    }
  }

  /**
   * Request notification permission (iOS and Android 13+)
   */
  async requestPermission(): Promise<boolean> {
    try {
      if (!getMessaging) {
        // Fallback to expo-notifications for iOS
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        return finalStatus === 'granted';
      }

      const messaging = getMessaging();
      const authStatus = await requestPermission(messaging);
      const enabled = authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        console.warn('⚠️ Notification permission not granted:', authStatus);
      }

      return enabled;
    } catch (error) {
      console.error('❌ Error requesting permission:', error);
      return false;
    }
  }

  /**
   * Setup Android notification channel
   */
  async setupAndroidChannel() {
    if (Platform.OS !== 'android') return;

    try {
      await Notifications.setNotificationChannelAsync('default', {
        enableVibrate: true,
        importance: Notifications.AndroidImportance.MAX,
        lightColor: '#FF231F7C',
        name: 'Default',
        showBadge: true,
        sound: 'default',
        vibrationPattern: [0, 250, 250, 250],
      });

      // High priority channel for important notifications
      await Notifications.setNotificationChannelAsync('high-priority', {
        enableVibrate: true,
        importance: Notifications.AndroidImportance.MAX,
        lightColor: '#FF0000',
        name: 'High Priority',
        showBadge: true,
        sound: 'default',
        vibrationPattern: [0, 250, 250, 250],
      });

      console.log('✅ Android notification channels created');
    } catch (error) {
      console.error('❌ Error setting up Android channel:', error);
    }
  }

  /**
   * Get FCM token
   */
  async getFCMToken(): Promise<string | null> {
    try {
      if (this.fcmToken) {
        return this.fcmToken;
      }

      if (!getMessaging) {
        // Use Expo Push Token for iOS if Firebase not available
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        this.fcmToken = token;
        console.log('📱 Expo Push Token obtained:', token);
        return token;
      }

      const messaging = getMessaging();
      const token = await getToken(messaging);
      this.fcmToken = token;
      console.log('🔥 FCM Token obtained:', token);

      this.unsubscribeOnTokenRefresh = onTokenRefresh(messaging, (newToken: string) => {
        this.fcmToken = newToken;
        this.onTokenRefresh?.(newToken);
      });

      return token;
    } catch (error) {
      console.error('❌ Error getting FCM token:', error);
      return null;
    }
  }

  /**
   * Setup message handlers for different app states
   */
  setupMessageHandlers() {
    if (!getMessaging) {
      // Use Expo notifications listeners for iOS
      const notificationListener = Notifications.addNotificationReceivedListener(notification => {
        console.log('📩 Notification received (foreground):', notification);
        this.onForegroundMessage?.(notification);
      });

      const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
        console.log('👆 Notification tapped:', response);
        this.onNotificationTap?.(response.notification);
      });

      this.unsubscribeOnMessage = () => notificationListener.remove();
      this.unsubscribeOnNotificationOpenedApp = () => responseListener.remove();
      return;
    }

    const messaging = getMessaging();

    // Handle foreground messages (when app is open)
    this.unsubscribeOnMessage = onMessage(messaging, async (remoteMessage: any) => {
      console.log('📩 FCM Message received (foreground):', remoteMessage);

      // Show local notification when app is in foreground
      if (remoteMessage.notification) {
        const notif = remoteMessage.notification;
        const imageUrl = notif.imageUrl ?? notif.android?.imageUrl ?? notif.image ?? null;

        const content = {
          body: notif.body || '',
          data: remoteMessage.data,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          sound: 'default',
          title: notif.title || 'Notification',
        };

        // iOS: show image via attachments when URL is provided by backend
        if (imageUrl && Platform.OS === 'ios') {
          content.attachments = [{ identifier: null, type: 'image', url: imageUrl }];
        }
        // Android: image in notification is usually shown by the system when in background.
        // In foreground we only set title/body; for big picture you'd need native config or backend to send imageUrl.

        await Notifications.scheduleNotificationAsync({
          content,
          trigger: null, // Show immediately
        });
      }

      // Call custom handler if provided
      this.onForegroundMessage?.(remoteMessage);
    });

    // Handle notification tap when app is in background
    this.unsubscribeOnNotificationOpenedApp = onNotificationOpenedApp(messaging, (remoteMessage: any) => {
      console.log('👆 Notification opened app from background:', remoteMessage);
      this.onNotificationTap?.(remoteMessage);
    });
  }

  /**
   * Check if app was opened from a notification
   */
  async checkInitialNotification() {
    if (!getMessaging) {
      const response = await Notifications.getLastNotificationResponseAsync();
      if (response) {
        console.log('🚀 App opened from notification (killed state):', response);
        this.onNotificationTap?.(response.notification);
      }
      return;
    }

    const messaging = getMessaging();
    const remoteMessage = await getInitialNotification(messaging);
    if (remoteMessage) {
      console.log('🚀 App opened from notification (killed state):', remoteMessage);
      this.onNotificationTap?.(remoteMessage);
    }
  }

  /**
   * Get current FCM token
   */
  getCurrentToken(): string | null {
    return this.fcmToken;
  }

  /**
   * Delete FCM token (useful for logout)
   */
  async deleteToken() {
    try {
      if (getMessaging && deleteToken) {
        const messaging = getMessaging();
        await deleteToken(messaging);
      }
      this.fcmToken = null;
      console.log('🗑️ Token deleted');
    } catch (error) {
      console.error('❌ Error deleting token:', error);
    }
  }

  /**
   * Cleanup listeners
   */
  cleanup() {
    this.unsubscribeOnMessage?.();
    this.unsubscribeOnNotificationOpenedApp?.();
    this.unsubscribeOnTokenRefresh?.();
  }

  // Callback handlers (to be set by the app)
  onTokenRefresh?: (token: string) => void;

  onForegroundMessage?: (message: any) => void;

  onNotificationTap?: (message: any) => void;
}

// Export singleton instance
export const pushNotificationService = new PushNotificationService();
