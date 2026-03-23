import { Box } from '@ludo/ui';

import LoginSocialApple from './login-social-apple.component';
import LoginSocialGoogle from './login-social-google.component';

type LoginSocialNetworksProps = {
  flow: 'login' | 'register';
};

export default function LoginSocialNetworks({ flow }: LoginSocialNetworksProps) {
  return (
    <Box className='gap-4'>
      <LoginSocialGoogle flow={flow} />
      <LoginSocialApple flow={flow} />
    </Box>
  );
}
