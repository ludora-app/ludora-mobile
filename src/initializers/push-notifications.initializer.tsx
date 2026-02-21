import { useEffect } from "react";

import { usePushNotifications } from "@/hooks/push-notifications.hook";


export default function PushNotificationsInitializer() {
  const { fcmToken } = usePushNotifications();

  useEffect(() => {
    if (fcmToken) {
      console.log('📱 FCM Token ready:', fcmToken);
      // TODO: Send token to your backend API
      // Example: api.post('/users/fcm-token', { token: fcmToken });
    }
  }, [fcmToken]);

  return null;
}