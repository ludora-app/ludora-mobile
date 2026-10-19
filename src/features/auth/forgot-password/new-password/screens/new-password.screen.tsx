import { z } from 'zod/v4-mini';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { useLocalSearchParams } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormInput, String, WrapperKeyboardAwareScrollView, Wrapper } from '@ludo/ui';

import { ErrorResponse } from '@/api/orval.instance';
import { useDisableBack } from '@/hooks/navigation.hooks';
import { useAuthHelpers } from '@/hooks/auth-helpers.hook';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';

import { formSchema } from '../schemas/new-password.schema';
import { useNewPassword } from '../queries/new-password.query';
import { AuthHeader } from '../../../components/auth-header/auth-header.component';

export const NewPasswordScreen = () => {
  useDisableBack();
  const { t } = useTranslate();
  const { login } = useAuthHelpers();
  const { resetToken } = useLocalSearchParams<{ resetToken: string }>();
  const { trackError, trackEvent } = useAnalytics();
  const { isPending: isAddingNewPassword, mutateAsync: addNewPassword } = useNewPassword();
  const newPasswordFormSchema = formSchema(t);
  const { control, handleSubmit } = useForm<z.infer<typeof newPasswordFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(newPasswordFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof newPasswordFormSchema>) => {
    const { newPassword } = data;
    try {
      const response = await addNewPassword({ newPassword, resetToken });
      login(response.data);
      trackEvent({
        eventName: 'reset_password_new_password_success',
      });
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      trackEvent({
        data: {
          error_message: errorResponse.api_error_detail ?? 'Unknown error',
          flow: 'Authentication',
        },
        eventName: 'reset_password_new_password_failed',
      });
      trackError({
        error,
      });
    }
  };

  return (
    <WrapperKeyboardAwareScrollView
      safeArea={['bottom']}
      px="none"
      hasKeyboardToolbar
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      mode="layout"
      bounces={false}
    >
      <AuthHeader title={t('auth.new-password.title')} mascotName="ludo-sunglass" hasGoBackButton={false} />
      <Wrapper className="gap-3.5 pt-6.5">
        <String className="mb-1.5 text-center">{t('auth.new-password.description')}</String>
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
        <Button
          title={t('common.send')}
          onPress={handleSubmit(onSubmit)}
          className="mt-1 w-full"
          size="xl"
          isLoading={isAddingNewPassword}
        />
      </Wrapper>
    </WrapperKeyboardAwareScrollView>
  );
};
