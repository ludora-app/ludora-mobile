import { Box } from '@chillui/ui';

import LoginSocialApple from './login-social-apple.component';
import LoginSocialGoogle from './login-social-google.component';
import LoginSocialFacebook from './login-social-facebook.component';

export default function LoginSocialNetworks() {
  return (
    <Box className="flex-row gap-4">
      <LoginSocialApple />
      <LoginSocialFacebook />
      <LoginSocialGoogle />
    </Box>
  );
}
