import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';

import { ErrorResponse } from '@/api/orval.instance';
import { IS_IOS } from '@/constants/platform.constants';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';

import { useLoginApple } from '../../queries/login-apple.query';

const styles = StyleSheet.create({
  button: {
    height: 48,
    width: '100%',
  },
});

type LoginSocialAppleProps = {
  flow: 'login' | 'register';
};

export default function LoginSocialApple({ flow }: LoginSocialAppleProps) {
  const { trackError, trackEvent } = useAnalytics();
  const { mutateAsync: appleLogin } = useLoginApple();
  const [isAppleAuthAvailable, setIsAppleAuthAvailable] = useState(false);

  useEffect(() => {
    if (IS_IOS) {
      AppleAuthentication.isAvailableAsync().then(setIsAppleAuthAvailable);
    }
  }, []);

  const handlePress = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const response = await appleLogin(credential);
      const isNewUser = response?.data?.isNewUser;
      if (isNewUser) {
        trackEvent({
          data: { auto_register_from_login: flow === 'login', flow: 'Authentication', method: 'apple' },
          eventName: 'signup_success',
        });
      } else {
        trackEvent({
          data: { auto_login_from_signup: flow === 'register', flow: 'Authentication', method: 'apple' },
          eventName: 'login_success',
        });
      }
    } catch (error) {
      if ((error as any).code === 'ERR_REQUEST_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        const responseError = error as ErrorResponse;
        trackEvent({
          data: {
            error_message: responseError?.api_error_detail || 'Unknown error',
            flow: 'Authentication',
            method: 'apple',
          },
          eventName: flow === 'login' ? 'login_failed' : 'signup_failed',
        });
        trackError({ error });
      }
    }
  };

  if (!isAppleAuthAvailable) {
    return null;
  }

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE}
      cornerRadius={30}
      style={styles.button}
      onPress={handlePress}
    />
  );
}
