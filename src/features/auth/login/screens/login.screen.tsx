import { useTranslate } from '@tolgee/react';
import { Box, BoxGrow, Separator, WrapperKeyboardAwareScrollView } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';

import { LoginEmailForm } from '../components/login-email-form.component';
import { AuthSwitchLink } from '../../components/auth-switch-link.component';
import { AuthHeader } from '../../components/auth-header/auth-header.component';
import { LoginSocialNetworks } from '../components/login-social-networks/login-social-networks.component';

export const LoginScreen = () => {
  const { t } = useTranslate();

  return (
    <BoxGrow className="bg-background">
      <WrapperKeyboardAwareScrollView
        px="none"
        androidSafeAreaBottom={false}
        hasKeyboardToolbar
        contentContainerClassName="grow"
        mode="layout"
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <AuthHeader title={t('auth.login.header_title')} mascotName="ludo-idea-2" />
        <BoxGrow className="px-5 pt-6.5">
          <Box className="gap-3.5">
            <LoginEmailForm />
            <Separator title={t('common.or')} />
            <LoginSocialNetworks flow="login" />
          </Box>
          <AuthSwitchLink
            href={ROUTES.AUTH.REGISTER_STEP_1}
            question={t('auth.login.dont_have_an_account')}
            actionTitle={t('auth.login.dont_have_an_account_create_account')}
          />
        </BoxGrow>
      </WrapperKeyboardAwareScrollView>
    </BoxGrow>
  );
};
