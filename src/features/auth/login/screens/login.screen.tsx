import { useTranslate } from '@tolgee/react';
import { Box, Separator, WrapperKeyboardAwareScrollView, Wrapper } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import { HeaderMascot } from '@/components/ui/header';

import { LoginEmailForm } from '../components/login-email-form.component';
import { AuthSwitchLink } from '../../components/auth-switch-link.component';
import { LoginSocialNetworks } from '../components/login-social-networks/login-social-networks.component';

export const LoginScreen = () => {
  const { t } = useTranslate();

  return (
    <WrapperKeyboardAwareScrollView
      px="none"
      hasKeyboardToolbar
      mode="layout"
      grow
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      bounces={false}
      safeArea={['bottom']}
    >
      <HeaderMascot title={t('auth.login.header_title')} mascotName="ludo-idea-2" />
      <Wrapper grow className="pt-6.5">
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
      </Wrapper>
    </WrapperKeyboardAwareScrollView>
  );
};
