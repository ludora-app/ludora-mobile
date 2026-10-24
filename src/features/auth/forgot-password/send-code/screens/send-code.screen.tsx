import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, FormInput, String, Wrapper, WrapperKeyboardAwareScrollView } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import { ErrorResponse } from '@/api/orval.instance';
import { HeaderMascot } from '@/components/ui/header';
import { useAppNavigation } from '@/hooks/navigation.hooks';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';

import { formSchema, SendCodeFormData } from '../schemas/send-code.schema';
import { AuthSwitchLink } from '../../../components/auth-switch-link.component';
import { useSendVerificationCodeByEmail } from '../queries/send-verification-code.query';

export const SendCodeScreen = () => {
  const { t } = useTranslate();
  const { isPending: isSendingVerificationCode, mutateAsync: sendVerificationCode } = useSendVerificationCodeByEmail();
  const router = useRouter();
  const { goBack } = useAppNavigation();
  const { trackError, trackEvent } = useAnalytics();

  const { control, handleSubmit } = useForm<SendCodeFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: SendCodeFormData) => {
    try {
      await sendVerificationCode({ email: data.email });
      trackEvent({
        eventName: 'reset_password_send_code_with_email_success',
      });
      router.navigate({ params: { email: data.email.toLowerCase() }, pathname: ROUTES.AUTH.VERIFY_CODE });
      // TODO : ADD ERROR HANDLING WHEN USER HAD ATTEMPS TOO MANY TIMES
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      trackError({
        error,
      });
      trackEvent({
        data: { error_message: errorResponse.api_error_detail ?? 'unknow error' },
        eventName: 'reset_password_send_code_with_email_failed',
      });
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
      <HeaderMascot title={t('auth.reset-password.title')} mascotName="ludo-search" />
      <Wrapper className="pt-6.5" grow>
        <Box className="gap-3.5">
          <String className="mb-1.5 text-center">{t('auth.reset-password.description')}</String>
          <FormInput
            control={control}
            name="email"
            label={t('common.input_email_label')}
            placeholder={t('common.input_email_placeholder')}
            keyboardType="email-address"
            autoComplete="email"
          />
          <Button
            title={t('common.send')}
            onPress={handleSubmit(onSubmit)}
            className="w-full"
            size="xl"
            isLoading={isSendingVerificationCode}
          />
        </Box>
        <AuthSwitchLink actionTitle={t('auth.reset-password.back_to_login')} onPress={goBack} />
      </Wrapper>
    </WrapperKeyboardAwareScrollView>
  );
};
