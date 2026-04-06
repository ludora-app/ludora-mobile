import { Button } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { cn } from '@/components/chill-ui-library';
import { ErrorResponse } from '@/api/orval.instance';
import { IS_IOS } from '@/constants/platform.constants';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import configureGoogleSignIn from '@/configs/google-auth.config';
import useLoginGoogle from '@/features/auth/login/queries/login-google.query';

type LoginSocialGoogleProps = {
  flow: 'login' | 'register';
};

const GOOGLE_ERROR_MESSAGE = "Cannot read property 'user' of null";
const GOOGLE_ERROR_MESSAGE_2 = 'Google sign-in did not return user data';

configureGoogleSignIn();
export default function LoginSocialGoogle({ flow }: LoginSocialGoogleProps) {
  const { t } = useTranslate();
  const { isPending: googleSignInPending, mutateAsync: googleSignInMutation } = useLoginGoogle();
  const { trackError, trackEvent } = useAnalytics();

  const handleSubmit = async () => {
    try {
      trackEvent({
        data: { method: 'google' },
        eventName: flow === 'login' ? 'login_requested' : 'signup_requested',
      });
      const response = await googleSignInMutation();
      const isNewUser = response?.data?.isNewUser;
      if (isNewUser) {
        trackEvent({
          data: { auto_register_from_login: flow === 'login', flow: 'Authentication', method: 'google' },
          eventName: 'signup_success',
        });
      } else {
        trackEvent({
          data: { auto_login_from_signup: flow === 'register', flow: 'Authentication', method: 'google' },
          eventName: 'login_success',
        });
      }
    } catch (error) {
      if ((error as any).message === GOOGLE_ERROR_MESSAGE || (error as any).message === GOOGLE_ERROR_MESSAGE_2) {
        return;
      }
      const responseError = error as ErrorResponse;
      trackEvent({
        data: {
          error_message: responseError?.api_error_detail || 'Unknown error',
          flow: 'Authentication',
          method: 'google',
        },
        eventName: flow === 'login' ? 'login_failed' : 'signup_failed',
      });
      trackError({ error });
    }
  };

  return (
    <Button
      iconProps={{
        name: 'google-colored',
        position: 'left-outside',
      }}
      onPress={handleSubmit}
      variant="outlined"
      isLoading={googleSignInPending}
      title={t(`auth.${flow}.button_google_title`)}
      className={cn('w-full border border-[#747775] bg-white', { 'border-[#000]': IS_IOS })}
      titleProps={{
        className: 'text-[#1F1F1F]',
      }}
      loaderProps={{
        color: '#1F1F1F',
      }}
    />
  );
}
