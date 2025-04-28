import { Link } from 'expo-router';
import { loginImage } from 'assets';
import { Box, Image, String, Wrapper } from '@chillUI';
import Separator from '@/components/chillUI/separator/Separator';

import LoginEmailForm from '../components/login-email-form.component';
import LoginSocialNetworks from '../components/login-social-networks/login-social-networks.component';

export default function LoginScreen() {
  return (
    <Wrapper keyboardAwareScrollView edges={['left', 'right']}>
      <Box className="items-end justify-end gap-4 pt-10">
        <Image source={loginImage} contentFit="contain" className="size-16" />
      </Box>
      <Box className="flex-1 justify-around gap-5">
        <Box>
          <String size="2xl" weight="bold" className="mb-10">
            Se connecter
          </String>

          <LoginEmailForm />
          <Separator title="Ou se connecter avec" className="mb-5 mt-10" />
          <LoginSocialNetworks />
        </Box>
        <String weight="semiBold" className="text-center" useFastText={false}>
          Vous avez déjà un compte ?{' '}
          <Link href="/auth/register">
            <String weight="bold" variant="primary" className="text-primary underline" useFastText={false}>
              Créer un compte
            </String>
          </Link>
        </String>
      </Box>
    </Wrapper>
  );
}
