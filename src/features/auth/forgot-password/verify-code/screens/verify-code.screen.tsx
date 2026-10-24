import { useState } from 'react';
import { useTranslate } from '@tolgee/react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Box, BoxRow, FormCodeInput, Icon, String, WrapperKeyboardAwareScrollView, Wrapper } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { ErrorResponse } from '@/api/orval.instance';
import { HeaderMascot } from '@/components/ui/header';
import { useAppNavigation } from '@/hooks/navigation.hooks';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';

import { useVerifyCode } from '../queries/verify-code.query';
import { VERIFY_CODE_ERRORS } from '../utils/verify-code-errors.utils';
import { formSchema, VerifyCodeFormData } from '../schemas/verify-code.schema';
import { AuthSwitchLink } from '../../../components/auth-switch-link.component';
import { VERIFY_CODE_LENGTH, VERIFY_CODE_REGEX } from '../constants/verify-code.constants';
import { VerifyCodeSubmitButton } from '../components/verify-code-submit-button.component';

const API_ERROR_KEYS: Record<string, string> = {
  [VERIFY_CODE_ERRORS.CODE_INCORRECT]: 'auth.verify-code.incorrect_code',
  [VERIFY_CODE_ERRORS.EXCEEDED_ATTEMPTS]: 'auth.verify-code.exceeded_attempts',
  [VERIFY_CODE_ERRORS.EXPIRED_CODE]: 'auth.verify-code.expired_code',
};

export const VerifyCodeScreen = () => {
  const router = useRouter();
  const { t } = useTranslate();
  const { goBack } = useAppNavigation();
  const { email = '' } = useLocalSearchParams<{ email: string }>();
  const { trackError, trackEvent } = useAnalytics();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<VerifyCodeFormData>({
    defaultValues: { code: '' },
    resolver: zodResolver(formSchema),
  });

  const { isPending: isVerifyingCode, mutateAsync: verifyCode } = useVerifyCode();
  const [apiErrorKey, setApiErrorKey] = useState<string | null>(null);
  const code = useWatch({ control, name: 'code' });

  const errorKey = apiErrorKey ?? (errors.code ? 'auth.verify-code.resend_code_input_error_message' : null);

  const onSubmit = async (data: VerifyCodeFormData) => {
    try {
      const response = await verifyCode({ code: data.code, email });
      trackEvent({
        eventName: 'reset_password_verify_code_success',
      });
      router.replace({ params: { resetToken: response.resetToken }, pathname: ROUTES.AUTH.NEW_PASSWORD });
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      trackEvent({
        data: {
          error_message: errorResponse.api_error_detail ?? 'unknow error',
        },
        eventName: 'reset_password_verify_code_failed',
      });
      const knownErrorKey = API_ERROR_KEYS[errorResponse.api_error_detail ?? ''];
      if (!knownErrorKey) {
        trackError({ error });
        return;
      }
      setApiErrorKey(knownErrorKey);
    }
  };

  return (
    <WrapperKeyboardAwareScrollView
      px="none"
      grow
      mode="layout"
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      bounces={false}
      safeArea={['bottom']}
    >
      <HeaderMascot title={t('auth.verify-code.title')} mascotName="ludo-idea" />
      <Wrapper grow className="pt-6.5">
        <Box className="gap-3.5">
          <Box className="mb-1.5 gap-1.5">
            <String className="text-center">{t('auth.verify-code.description')}</String>
            <String font="primaryBold" variant="body-2" className="text-center">
              {email}
            </String>
          </Box>
          <Box className="gap-2">
            <FormCodeInput
              control={control}
              name="code"
              length={VERIFY_CODE_LENGTH}
              hasError={!!errorKey}
              onChangeText={() => setApiErrorKey(null)}
            />
            {!!errorKey && (
              <BoxRow className="items-center gap-1">
                <Icon name="warning-solid" size="xs" color={COLORS.error} />
                <String colorVariant="error" font="primarySemiBold" variant="body-xs">
                  {t(errorKey)}
                </String>
              </BoxRow>
            )}
          </Box>
          <VerifyCodeSubmitButton
            isLoading={isVerifyingCode}
            isCodeComplete={VERIFY_CODE_REGEX.test(code)}
            onSubmit={handleSubmit(onSubmit)}
            userEmail={email}
          />
        </Box>
        <AuthSwitchLink actionTitle={t('auth.verify-code.change_email')} onPress={goBack} />
      </Wrapper>
    </WrapperKeyboardAwareScrollView>
  );
};
