import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, Button, Wrapper } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import { ErrorResponse } from '@/api/orval.instance';
import { useDisableBack } from '@/hooks/navigation.hook';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import HeaderGoBack from '@/components/ui/navigation/header-go-back/components/header-go-back.component';

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
    try {
      await sendVerificationCode({ data: { email: data.email } });
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
        data: { error_message: errorResponse?.api_error_detail || 'unknow error' },
        eventName: 'reset_password_send_code_with_email_failed',
      });
    }
  };

  return (
    <>
      <HeaderGoBack title={t('auth.reset-password.title')} hasTopSafeArea />
      <Wrapper hasSafeArea edges={['bottom']}>
        <AuthHeader description="auth.reset-password.description" />
        <ContentWapper>
          <FormInput
            control={control}
            name="email"
            label={t('common.input_email_label')}
            placeholder={t('common.input_email_placeholder')}
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
      </Wrapper>
    </>
  );
}
