import { cn } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, Icon, String } from '@ludo/ui';
import { Linking, Pressable, StyleSheet } from 'react-native';

import COLORS from '@/constants/colors.contstants';

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 8px 18px -10px rgba(120, 40, 25, 0.35)',
  },
});

type LocationDeniedBannerProps = {
  className?: string;
  /** Replaces the default description, to say what the location is used for on this screen. */
  description?: string;
  /** Shows a close button when set. */
  onClose?: () => void;
};

/** Tells the location permission is denied, with a shortcut to the app settings. */
export const LocationDeniedBanner = (props: LocationDeniedBannerProps) => {
  const { className, description, onClose } = props;
  const { t } = useTranslate();

  return (
    <BoxRow className={cn('gap-3 rounded-field bg-primarySoft p-3.5', className)} style={styles.shadow}>
      <Icon name="warning-regular" color={COLORS.secondary} size="md" />
      <Box className="flex-1 items-start gap-1">
        <String font="primaryExtraBold">{t('location-denied-banner.title')}</String>
        <String variant="body-sm" font="primarySemiBold" colorVariant="muted">
          {description ?? t('location-denied-banner.description')}
        </String>
        <Pressable className="h-11 justify-center" onPress={Linking.openSettings}>
          <String font="primaryExtraBold" colorVariant="primary" className="underline">
            {t('location-denied-banner.open_settings')}
          </String>
        </Pressable>
      </Box>
      {onClose && (
        <Pressable onPress={onClose} hitSlop={12} className="size-6 items-center justify-center">
          <Icon name="xmark-solid" color={COLORS.dark} size="xs" />
        </Pressable>
      )}
    </BoxRow>
  );
};
