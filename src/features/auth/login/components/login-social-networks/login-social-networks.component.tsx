import { Box } from '@ludo/ui';

import LoginSocialGoogle from './login-social-google.component';

type LoginSocialNetworksProps = {
  flow: 'login' | 'register';
};

export default function LoginSocialNetworks({ flow }: LoginSocialNetworksProps) {
  return (
    <Box>
      <LoginSocialGoogle flow={flow} />
    </Box>
  );
}
