import * as Device from 'expo-device';
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
  // eslint-disable-next-line @typescript-eslint/no-require-imports, global-require
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
  // eslint-disable-next-line no-console
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
    const hasPermission = await PushNotificationService.requestPermission();
    if (!hasPermission) {
      return null;
    }

    // Setup Android notification channel
    if (Platform.OS === 'android') {
      await PushNotificationService.setupAndroidChannel();
    }

    // Get FCM token
    const token = await this.getFCMToken();

    // Setup message handlers
    this.setupMessageHandlers();

    // Check if app was opened from a notification
    await this.checkInitialNotification();

    return token;
  }

  /**
   * Request notification permission (iOS and Android 13+)
   */
  static async requestPermission(): Promise<boolean> {
    // On Android, Firebase's requestPermission() does NOT show the system dialog.
    // expo-notifications properly triggers the POST_NOTIFICATIONS dialog on Android 13+ (API 33+).
    if (Platform.OS === 'android') {
      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    }

    if (!getMessaging) {
      // iOS without Firebase: fallback to expo-notifications
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      return finalStatus === 'granted';
    }

    // iOS with Firebase: use Firebase which handles PROVISIONAL and AUTHORIZED
    const messaging = getMessaging();
    const authStatus = await requestPermission(messaging);
    const enabled = authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL;

    return enabled;
  }

  /**
   * Setup Android notification channels
   */
  static async setupAndroidChannel() {
    if (Platform.OS !== 'android') return;

    const commonConfig = {
      enableVibrate: true,
      importance: Notifications.AndroidImportance.MAX,
      showBadge: true,
      vibrationPattern: [0, 250, 250, 250],
    };

    // Default channel
    await Notifications.setNotificationChannelAsync('default', {
      ...commonConfig,
      lightColor: '#FF231F7C',
      name: 'Default',
    });

    // Messages channel
    await Notifications.setNotificationChannelAsync('messages', {
      ...commonConfig,
      lightColor: '#00FF00',
      name: 'Messages',
    });

    // Social channel
    await Notifications.setNotificationChannelAsync('social', {
      ...commonConfig,
      lightColor: '#0000FF',
      name: 'Social',
    });

    // Sessions channel
    await Notifications.setNotificationChannelAsync('sessions', {
      ...commonConfig,
      lightColor: '#FFA500',
      name: 'Sessions',
    });

    // Account channel
    await Notifications.setNotificationChannelAsync('account', {
      ...commonConfig,
      lightColor: '#808080',
      name: 'Account',
    });

    // High priority channel for important notifications
    await Notifications.setNotificationChannelAsync('high-priority', {
      ...commonConfig,
      lightColor: '#FF0000',
      name: 'High Priority',
    });
  }

  /**
   * Firebase v26 auto-registers for remote messages after permission on device.
   * On ARM64 simulators it intentionally skips APNs registration, so getToken always fails.
   */
  private static isUnregisteredMessagingError(error: unknown): boolean {
    if (!error || typeof error !== 'object') {
      return false;
    }

    const { code, message } = error as { code?: string; message?: string };
    return code === 'messaging/unregistered' || message?.includes('unregistered') === true;
  }

  private static async getFCMTokenFromFirebase(
    messaging: unknown,
    attempt = 0,
    maxAttempts = 5,
  ): Promise<string> {
    try {
      return await getToken(messaging);
    } catch (error) {
      const shouldRetry =
        PushNotificationService.isUnregisteredMessagingError(error) && attempt < maxAttempts - 1;

      if (!shouldRetry) {
        throw error;
      }

      await new Promise<void>(resolve => {
        setTimeout(resolve, 400 * (attempt + 1));
      });

      return PushNotificationService.getFCMTokenFromFirebase(messaging, attempt + 1, maxAttempts);
    }
  }

  /**
   * Get FCM token
   */
  async getFCMToken(): Promise<string | null> {
    if (this.fcmToken) {
      return this.fcmToken;
    }

    if (!getMessaging) {
      // Use Expo Push Token for iOS if Firebase not available
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      this.fcmToken = token;
      return token;
    }

    if (Platform.OS === 'ios' && !Device.isDevice) {
      return null;
    }

    const messaging = getMessaging();

    try {
      const token = await PushNotificationService.getFCMTokenFromFirebase(messaging);
      this.fcmToken = token;

      this.unsubscribeOnTokenRefresh = onTokenRefresh(messaging, (newToken: string) => {
        this.fcmToken = newToken;
        this.onTokenRefresh?.(newToken);
      });

      return token;
    } catch (error) {
      if (PushNotificationService.isUnregisteredMessagingError(error)) {
        return null;
      }

      throw error;
    }
  }

  /**
   * Setup message handlers for different app states
   */
  setupMessageHandlers() {
    if (!getMessaging) {
      // Use Expo notifications listeners for iOS
      const notificationListener = Notifications.addNotificationReceivedListener(notification => {
        this.onForegroundMessage?.(notification);
      });

      const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
        this.onNotificationTap?.(response.notification);
      });

      this.unsubscribeOnMessage = () => notificationListener.remove();
      this.unsubscribeOnNotificationOpenedApp = () => responseListener.remove();
      return;
    }

    const messaging = getMessaging();

    // Handle foreground messages (when app is open)
    this.unsubscribeOnMessage = onMessage(messaging, async (remoteMessage: any) => {
      // Show local notification when app is in foreground
      if (remoteMessage.notification) {
        const notif = remoteMessage.notification;
        const imageUrl = notif.imageUrl ?? notif.android?.imageUrl ?? notif.image ?? null;

        const content: Notifications.NotificationContentInput = {
          body: notif.body || '',
          data: remoteMessage.data,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          sound: true,
          title: notif.title || 'Notification',
        };

        // iOS: show image via attachments when URL is provided by backend
        if (imageUrl && Platform.OS === 'ios') {
          content.attachments = [{ identifier: null, type: 'image', url: imageUrl }];
        }

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
      this.onNotificationTap?.(remoteMessage);
    });
  }

  /**
   * Check if app was opened from a notification
   */
  async checkInitialNotification() {
    if (!getMessaging) {
      const response = Notifications.getLastNotificationResponse();
      if (response) {
        this.onNotificationTap?.(response.notification);
      }
      return;
    }

    const messaging = getMessaging();
    const remoteMessage = await getInitialNotification(messaging);
    if (remoteMessage) {
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
    if (getMessaging && deleteToken) {
      const messaging = getMessaging();
      await deleteToken(messaging);
    }
    this.fcmToken = null;
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
