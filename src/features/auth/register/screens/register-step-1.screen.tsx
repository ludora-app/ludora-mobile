import { registerImage } from 'assets';
import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Image, Button, String, Box, WrapperSafeAreaView, Link } from '@ludo/ui';

import LoginSocialGoogle from '../../login/components/login-social-networks/login-social-google.component';

export default function RegisterStep1Screen() {
  const { t } = useTranslate();

  return (
    <WrapperSafeAreaView edges={['bottom']}>
      <Box className="flex-1 items-center justify-end gap-3">
        <Image source={registerImage} contentFit="contain" className="h-[40%] w-5/6" />
        <Box className="items-center justify-center gap-3 px-10">
          <String size="2xl" className="text-center">
            Créer un compte
          </String>
          <String className="text-center">
            Créez un compte pour accéder à votre espace et profiter de toutes les fonctionnalités de l&apos;application.
          </String>
        </Box>
      </Box>
      <Box className="flex-1 justify-around">
        <Box className="gap-4">
          <Button title="Continuer avec Email" redirect="/auth/register/step-2" className="w-full" size="lg" />
          <LoginSocialGoogle flow="register" />
        </Box>

        <Link href="/auth/login" asChild replace>
          <Pressable className="mb-5 flex-row items-center justify-center">
            <String>{t('auth.register.dont_have_an_account')} </String>
            <String font="primaryBold" colorVariant="primary" className="underline">
              {t('auth.register.dont_have_an_account_create_account')}
            </String>
          </Pressable>
        </Link>
      </Box>
    </WrapperSafeAreaView>
  );
}
