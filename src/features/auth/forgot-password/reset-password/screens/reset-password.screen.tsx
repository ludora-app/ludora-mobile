import { useToast } from '@chillui/ui';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { WrapperSafeAreaView, FormInput, Button } from '@ludo/ui';

import ROUTES from '@/constants/ROUTES';

import AuthHeader from '../../components/auth-header/ auth-header.component';
import { formSchema, ResetPasswordFormData } from '../schemas/reset-password.schema';
import ContentWapper from '../../components/content-wrapper/content-wrapper.component';
import { useSendVerificationCodeByEmail } from '../queries/send-verification-code.query';

export default function ResetPasswordScreen() {
  const { t } = useTranslate();
  const { isPending: isSendingVerificationCode, mutateAsync: sendVerificationCode } = useSendVerificationCodeByEmail();
  const router = useRouter();
  const { toast } = useToast();

  const { control, handleSubmit } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      // await sendVerificationCode({ data: { email: data.email.toLowerCase() } });
      router.push({ params: { email: data.email.toLowerCase() }, pathname: ROUTES.AUTH.VERIFY_CODE });
    } catch {
      toast({ message: t('common.error_generic'), variant: 'error' });
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
      />
    </WrapperSafeAreaView>
  );
}
