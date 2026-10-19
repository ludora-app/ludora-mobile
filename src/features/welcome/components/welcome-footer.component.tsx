import { Box, Button } from '@ludo/ui';
import { StyleSheet } from 'react-native';
import { useTranslate } from '@tolgee/react';

import ROUTES from '@/constants/routes.constants';
import { useSafeArea } from '@/hooks/safe-area.hook';

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px -10px 30px -14px rgba(51, 49, 50, 0.25)',
  },
});

export const WelcomeFooter = () => {
  const { t } = useTranslate();
  const { bottom } = useSafeArea();

  return (
    <Box
      className="gap-3 rounded-t-header bg-primary px-5 pt-5.5"
      style={[styles.shadow, { paddingBottom: bottom + 8 }]}
    >
      <Button
        title={t('welcome.create_account_button_title')}
        colorVariant="tertiary"
        redirect={ROUTES.AUTH.REGISTER_STEP_1}
        size="xl"
        titleProps={{ font: 'primaryExtraBold' }}
      />
      <Button
        title={t('common.login')}
        variant="outlined"
        colorVariant="white"
        redirect={ROUTES.AUTH.LOGIN}
        size="xl"
      />
    </Box>
  );
};
