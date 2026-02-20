import * as Haptics from 'expo-haptics';

export type HapticType =
  | 'selection'
  | 'success'
  | 'warning'
  | 'error'
  | 'light'
  | 'medium'
  | 'heavy'
  | 'rigid'
  | 'soft';

/**
 * Hook to trigger different types of haptic feedback using expo-haptics.
 */
export const useHaptics = () => {
  const triggerHaptic = (type: HapticType) => {
    switch (type) {
      case 'selection':
        Haptics.selectionAsync();
        break;
      case 'success':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'warning':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case 'error':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
      case 'light':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'medium':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case 'rigid':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        break;
      case 'soft':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        break;
      default:
        break;
    }
  };

  return { triggerHaptic };
};
