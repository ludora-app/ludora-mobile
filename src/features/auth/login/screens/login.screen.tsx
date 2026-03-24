import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { String, Separator, Link, WrapperKeyboardAwareScrollView, BoxGrow } from '@ludo/ui';

import { useSafeArea } from '@/hooks/safe-area.hook';
import HeaderGoBack from '@/components/ui/navigation/header-go-back/components/header-go-back.component';

import LoginEmailForm from '../components/login-email-form.component';
import LoginSocialNetworks from '../components/login-social-networks/login-social-networks.component';

export default function LoginScreen() {
  const { t } = useTranslate();
  const { bottom } = useSafeArea();

  return (
    <>
      <HeaderGoBack title={t('auth.login.header_title')} hasTopSafeArea />
      <WrapperKeyboardAwareScrollView
        androidSafeAreaBottom={false}
        contentContainerClassName="grow"
        style={{ paddingBottom: bottom }}
      >
        <BoxGrow className="mt-10 pb-5">
          <LoginEmailForm />
          <Separator title={t('common.or')} className="my-5" />
          <LoginSocialNetworks flow="login" />
        </BoxGrow>
        <Link href="/auth/register/step-1" asChild replace>
          <Pressable className="flex-row items-center justify-center">
            <String>{t('auth.login.dont_have_an_account')} </String>
            <String font="primaryBold" colorVariant="primary" className="underline">
              {t('auth.login.dont_have_an_account_create_account')}
            </String>
          </Pressable>
        </Link>
      </WrapperKeyboardAwareScrollView>
    </>
  );
}
