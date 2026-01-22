import { Button } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { ErrorResponse } from '@/api/orval.instance';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import configureGoogleSignIn from '@/configs/google-auth.config';
import useLoginGoogle from '@/features/auth/login/queries/login-google.query';

type LoginSocialGoogleProps = {
  flow: 'login' | 'register';
};


const GOOGLE_ERROR_MESSAGE = "Cannot read property 'user' of null";

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
          data: { auto_register_from_login: flow === 'login', method: 'google' },
          eventName: 'signup_success',
        });
      } else {
        trackEvent({
          data: { auto_login_from_signup: flow === 'register', method: 'google' },
          eventName: 'login_success',
        });
      }
    } catch (error) {
      if (error.message === GOOGLE_ERROR_MESSAGE) {
        return
      }
      const responseError = error as ErrorResponse;
      trackEvent({
        data: {
          error_message: responseError?.api_error_detail || 'Unknown error',
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
        position: "left-outside",
      }}
      onPress={handleSubmit}
      variant="outlined"
      isLoading={googleSignInPending}
      title={t(`auth.${flow}.button_google_title`)}
      className="w-full border-[#747775] border bg-white"
      titleProps={{
        className: "text-[#1F1F1F]"
      }}
      loaderProps={{
        color: "#1F1F1F",
      }}
    />

  );
}
