import { useEffect } from "react";
import * as Device from 'expo-device';
import { useRouter } from 'expo-router';
import * as Application from 'expo-application';

import { IS_ANDROID } from '@/constants/platform.constants'
import { RegisterDeviceDtoPlatform } from '@/api/generated/model'
import { useRegisterDevice } from "@/queries/register-device.query";
import { usePushNotifications } from "@/hooks/push-notifications.hook";
import { pushNotificationService } from '@/services/push-notification.service';
import {
  getNotificationData,
  resolveNotificationRoute,
} from '@/utils/push-notification-navigation.utils';

export default function PushNotificationsInitializer() {
  const router = useRouter();
  const { mutateAsync: registerDevice } = useRegisterDevice();
  const { fcmToken } = usePushNotifications();

  const getDeviceId = () => {
    if (IS_ANDROID) {
      return Application.getAndroidId();
    }
    return Application.getIosIdForVendorAsync();
  };

  useEffect(() => {
    pushNotificationService.onNotificationTap = (message: any) => {
      const data = getNotificationData(message);
      if (!data) return;
      const route = resolveNotificationRoute(data);
      if (route) {
        router.navigate(route as any);
      }
    };
    return () => {
      pushNotificationService.onNotificationTap = undefined;
    };
  }, [router]);

  useEffect(() => {
    const runRegister = async () => {
      if (!fcmToken) return;
      try {
        const deviceId = await getDeviceId();
        await registerDevice({
          appVersion: Application.nativeApplicationVersion,
          deviceId,
          fcmToken,
          osVersion: Device.osVersion,
          platform: IS_ANDROID ? RegisterDeviceDtoPlatform.ANDROID : RegisterDeviceDtoPlatform.IOS,
        });
      } catch (err) {
        // e.g. 401 when session expired; avoid unhandled rejection
        console.warn('Push: register device failed', err);
      }
    };
    runRegister();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fcmToken]);

  return null;
}