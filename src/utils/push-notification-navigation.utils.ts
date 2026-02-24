type NotificationData = {
  actionUrl?: string;
};

/**
 * Extract the data payload from an FCM remote message or Expo notification.
 */
export function getNotificationData(message: any): NotificationData | null {
  if (!message) return null;
  return message.data ?? message.request?.content?.data ?? null;
}

/**
 * Converts backend actionUrl (app://...) to Expo Router path.
 * The backend sends the correct path after app://, so we just strip the prefix.
 */
export function resolveNotificationRoute(data: NotificationData): string | null {
  const { actionUrl } = data;
  if (!actionUrl || !actionUrl.startsWith('app://')) return null;
  return `/${actionUrl.replace(/^app:\/\//, '')}`;
}
