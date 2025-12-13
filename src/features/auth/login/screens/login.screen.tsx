import { useEffect } from 'react';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { loginImage } from 'assets';
import { useTrackEvent } from 'expo-plausible';
import { Separator, Box, String, Wrapper } from '@chillui/ui';

import LoginEmailForm from '../components/login-email-form.component';
import LoginSocialNetworks from '../components/login-social-networks/login-social-networks.component';

export default function LoginScreen() {
  const trackEvent = useTrackEvent();

  useEffect(() => {
    trackEvent({
      name: 'login',
      url: '/auth/login',
    });
  }, []);

  return (
    <Wrapper>
      <Box className="items-end justify-end gap-4 pt-10">
        <Image source={loginImage} contentFit="contain" className="size-16" />
      </Box>
      <Box className="flex-1 justify-around gap-5">
        <Box>
          <String size="2xl" className="mb-10">
            Se connecter
          </String>

          <LoginEmailForm />
          <Separator title="Ou se connecter avec" className="mb-5 mt-10" />
          <LoginSocialNetworks />
        </Box>
        <String className="text-center" useFastText={false}>
          Vous avez déjà un compte ?{' '}
          <Link href="/auth/register">
            <String variant="body-1" className="text-primary underline" useFastText={false}>
              Créer un compte
            </String>
          </Link>
        </String>
      </Box>
    </Wrapper>
  );
}
