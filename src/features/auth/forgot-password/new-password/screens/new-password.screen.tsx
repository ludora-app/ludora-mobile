import { z } from 'zod/v4-mini';
import { Box } from '@chillui/ui';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { useLocalSearchParams } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { WrapperSafeAreaView, FormInput, Button } from '@ludo/ui';

import { ErrorResponse } from '@/api/orval.instance';
import { useAuthHelpers } from '@/hooks/auth-helpers.hook';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';

import { formSchema } from '../schemas/new-password.schema';
import { useNewPassword } from '../queries/new-password.query';
import AuthHeader from '../../components/auth-header/ auth-header.component';
import ContentWapper from '../../components/content-wrapper/content-wrapper.component';

export default function NewPasswordScreen() {
  const { t } = useTranslate();
  const { login } = useAuthHelpers();
  const { resetToken } = useLocalSearchParams();
  const { trackError, trackEvent } = useAnalytics();
  const { isPending: isAddingNewPassword, mutateAsync: addNewPassword } = useNewPassword();
  const newPasswordFormSchema = formSchema(t);
  const { control, handleSubmit } = useForm<z.infer<typeof newPasswordFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(newPasswordFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof newPasswordFormSchema>) => {
    trackEvent({
      eventName: 'reset_password_new_password_requested',
    });
    const { newPassword } = data;
    try {
      const response = await addNewPassword({ newPassword, resetToken: resetToken.toString() });
      login(response.data);
      trackEvent({
        eventName: 'reset_password_new_password_success',
      });
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      trackEvent({
        eventName: 'reset_password_new_password_failed',
        properties: {
          error_message: errorResponse.api_error_detail,
        },
      });
      trackError({
        error,
      });
    }
  };

  return (
    <WrapperSafeAreaView className="pt-24">
      <AuthHeader title="auth.new-password.title" description="auth.new-password.description" />
      <ContentWapper>
        <Box className="gap-4">
          <FormInput
            control={control}
            name="newPassword"
            label={t('auth.new-password.input_new_password_label')}
            placeholder={t('auth.new-password.input_new_password_placeholder')}
            secureTextEntry
            hasErrorTranslation={false}
          />
          <FormInput
            control={control}
            name="confirmPassword"
            label={t('auth.new-password.input_confirm_password_label')}
            placeholder={t('auth.new-password.input_confirm_password_placeholder')}
            secureTextEntry
            hasErrorTranslation={false}
          />
        </Box>
      </ContentWapper>
      <Button
        title={t('common.send')}
        onPress={handleSubmit(onSubmit)}
        className="w-full"
        size="lg"
        isLoading={isAddingNewPassword}
      />
    </WrapperSafeAreaView>
  );
}
