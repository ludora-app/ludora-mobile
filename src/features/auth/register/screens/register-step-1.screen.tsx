import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Button, String, Box, WrapperSafeAreaView, Link, Icon, BoxGrow, Separator } from '@ludo/ui';

import HeaderGoBack from '@/components/ui/navigation/header-go-back/components/header-go-back.component';

import LoginSocialGoogle from '../../login/components/login-social-networks/login-social-google.component';

export default function RegisterStep1Screen() {
  const { t } = useTranslate();

  return (
    <>
      <HeaderGoBack />
      <WrapperSafeAreaView edges={['bottom']} hasSafeArea>
        <BoxGrow className='gap-10 '>
          <Box className="items-center justify-center gap-5">
            <Icon name='ludo-sunglass' className="size-32" />
            <Box className="items-center justify-center gap-3 px-10">
              <String variant="title-1" className="text-center" font="primaryBold">
                {t('auth.register-step-1.create_account_title')}
              </String>
              <String className="text-center" font="primaryBold">
                {t('auth.register-step-1.create_account_description')}
              </String>
            </Box>
          </Box>

          <Box className="gap-4">
            <Button title={t('auth.register-step-1.register_with_email')} redirect="/auth/register/step-2" className="w-full" size="lg" iconProps={{
              name: 'email-solid',
              position: "left-outside",
            }} />
            <Separator title={t('common.or')} />
            <LoginSocialGoogle flow="register" />
          </Box>
        </BoxGrow>
        <Link href="/auth/login" asChild replace>
          <Pressable className="flex-row items-center justify-center">
            <String>{t('auth.register.dont_have_an_account')} </String>
            <String font="primaryBold" colorVariant="primary" className="underline">
              {t('auth.register.dont_have_an_account_create_account')}
            </String>
          </Pressable>
        </Link>

      </WrapperSafeAreaView>
    </>
  );
}
