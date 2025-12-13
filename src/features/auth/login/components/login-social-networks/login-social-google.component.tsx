import useLoginGoogle from '@/queries/useLoginGoogle';
import { Box, Button, Icon } from '@chillui/ui';
import configureGoogleSignIn from '@/configs/google-auth.config';

configureGoogleSignIn();
export default function LoginSocialGoogle() {
  const { isPending: googleSignInPending, mutateAsync: googleSignInMutation } = useLoginGoogle();
  return (
    <Box className="flex-1">
      <Button onPress={googleSignInMutation}>
        <Icon name="google" color="" size="lg" />
      </Button>
    </Box>
  );
}
