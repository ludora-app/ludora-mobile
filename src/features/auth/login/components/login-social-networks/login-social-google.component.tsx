import { Button } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { ErrorResponse } from '@/api/orval.instance';
import useLoginGoogle from '@/queries/login-google.query';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import configureGoogleSignIn from '@/configs/google-auth.config';

type LoginSocialGoogleProps = {
  flow: 'login' | 'register';
};

configureGoogleSignIn();
export default function LoginSocialGoogle({ flow }: LoginSocialGoogleProps) {
  const { t } = useTranslate();
  const { isPending: googleSignInPending, mutateAsync: googleSignInMutation } = useLoginGoogle();
  const { trackError, trackEvent } = useAnalytics();

  const handleSubmit = async () => {
    try {
      trackEvent({
        eventName: flow === 'login' ? 'login_requested' : 'signup_requested',
        properties: { method: 'google' },
      });
      await googleSignInMutation();
      const isNewUser = true;
      if (isNewUser) {
        trackEvent({
          eventName: 'signup_success',
          properties: { auto_register_from_login: flow === 'login', method: 'google' },
        });
      } else {
        trackEvent({
          eventName: 'login_success',
          properties: { auto_login_from_signup: flow === 'register', method: 'google' },
        });
      }
    } catch (error) {
      const responseError = error as ErrorResponse;
      trackEvent({
        eventName: flow === 'login' ? 'login_failed' : 'signup_failed',
        properties: {
          error_message: responseError?.api_error_detail || 'Unknown error',
          method: 'google',
        },
      });
      trackError({ error });
    }
  };

  return (
    <Button
      iconProps={{
        name: 'google-colored',
        position: 'left',
      }}
      onPress={handleSubmit}
      isLoading={googleSignInPending}
      title={t('auth.login.button_google_title')}
      className="w-full"
      size="lg"
    />
  );
}
