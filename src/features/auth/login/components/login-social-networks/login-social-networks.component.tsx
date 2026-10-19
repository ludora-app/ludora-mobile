import { Box } from '@ludo/ui';

import { LoginSocialApple } from './login-social-apple.component';
import { LoginSocialGoogle } from './login-social-google.component';

type LoginSocialNetworksProps = {
  flow: 'login' | 'register';
};

export const LoginSocialNetworks = ({ flow }: LoginSocialNetworksProps) => (
  <Box className="gap-3">
    <LoginSocialApple flow={flow} />
    <LoginSocialGoogle flow={flow} />
  </Box>
);
