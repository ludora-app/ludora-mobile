import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Box, String, Separator, Link, WrapperKeyboardAwareScrollView } from '@ludo/ui';

import LoginEmailForm from '../components/login-email-form.component';
import LoginSocialNetworks from '../components/login-social-networks/login-social-networks.component';

export default function LoginScreen() {
  const { t } = useTranslate();

  return (
    <WrapperKeyboardAwareScrollView hasSafeArea edges={['bottom']}>
      <Box className="mb-10 flex-1">
        <Box>
          <String variant="title-3" font="primaryExtraBold" className="mb-10">
            Se connecter
          </String>

          <LoginEmailForm />
          <Separator title={t('auth.login.divider_title')} className="my-5" />
          <LoginSocialNetworks flow="login" />
        </Box>
      </Box>
      <Link href="/auth/register/step-1" asChild replace>
        <Pressable className="flex-row items-center justify-center">
          <String>{t('auth.login.dont_have_an_account')} </String>
          <String font="primaryBold" colorVariant="primary" className="underline">
            {t('auth.login.dont_have_an_account_create_account')}
          </String>
        </Pressable>
      </Link>
    </WrapperKeyboardAwareScrollView>
  );
}
