import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { WrapperSafeAreaView, FormInput, Button } from '@ludo/ui';

import ROUTES from '@/constants/ROUTES';
import { ErrorResponse } from '@/api/orval.instance';
import { useDisableBack } from '@/hooks/navigation.hook';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';

import AuthHeader from '../../components/auth-header/ auth-header.component';
import { formSchema, ResetPasswordFormData } from '../schemas/reset-password.schema';
import ContentWapper from '../../components/content-wrapper/content-wrapper.component';
import { useSendVerificationCodeByEmail } from '../queries/send-verification-code.query';

export default function ResetPasswordScreen() {
  useDisableBack();
  const { t } = useTranslate();
  const { isPending: isSendingVerificationCode, mutateAsync: sendVerificationCode } = useSendVerificationCodeByEmail();
  const router = useRouter();
  const { trackError, trackEvent } = useAnalytics();

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<ResetPasswordFormData>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    trackEvent({
      eventName: 'reset_password_send_code_with_email_requested',
    });
    try {
      await sendVerificationCode({ data: { email: data.email } });
      trackEvent({
        eventName: 'reset_password_send_code_with_email_success',
      });
      router.push({ params: { email: data.email.toLowerCase() }, pathname: ROUTES.AUTH.VERIFY_CODE });
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      trackError({
        error,
      });
      trackEvent({
        eventName: 'reset_password_send_code_with_email_failed',
        properties: { error_message: errorResponse?.api_error_detail || 'unknow error' },
      });
    }
  };

  return (
    <WrapperSafeAreaView edges={['bottom']}>
      <AuthHeader title="auth.reset-password.title" description="auth.reset-password.description" />
      <ContentWapper>
        <FormInput
          control={control}
          name="email"
          label={t('common.input_email_label')}
          placeholder={t('auth.reset-password.input_email_placeholder')}
          keyboardType="email-address"
        />
      </ContentWapper>
      <Button
        title={t('common.send')}
        onPress={handleSubmit(onSubmit)}
        className="w-full"
        size="lg"
        isLoading={isSendingVerificationCode}
        isDisabled={!isValid}
      />
    </WrapperSafeAreaView>
  );
}
