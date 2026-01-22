import { z } from 'zod';
import { useToast } from '@chillui/ui';
import { Pressable } from 'react-native';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormInput, String, Box, Link } from '@ludo/ui';

import { ErrorResponse } from '@/api/orval.instance';
import { useAuthHelpers } from '@/hooks/auth-helpers.hook';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';

import { useLogin } from '../queries/login.query';
import { formSchema } from '../schemas/login.schema';
import { LOGIN_ERRORS } from '../constants/login-errors.constants';

export default function LoginEmailForm() {
  const { t } = useTranslate();
  const { isPending: loginIsPending, mutateAsync: loginMutation } = useLogin();
  const { login } = useAuthHelpers();
  const { toast } = useToast();
  const loginFormSchema = formSchema(t);
  const { control, handleSubmit } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const { trackError, trackEvent } = useAnalytics();

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    trackEvent({
      data: { method: 'email' },
      eventName: 'login_requested',
    });
    try {
      const response = await loginMutation({
        email: data.email,
        password: data.password,
      });

      if (!response?.data.accessToken || !response?.data.refreshToken) {
        throw new Error('Invalid response from server');
      }

      await login({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
      trackEvent({
        data: { method: 'email' },
        eventName: 'login_success',
      });
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      trackEvent({
        data: { error_message: errorResponse.api_error_detail, method: 'email' },
        eventName: 'login_failed',
      });
      if (Object.values(LOGIN_ERRORS).includes(errorResponse.api_error_detail)) {
        toast({
          message: t('auth.login.toaster_user_not_found'),
          variant: 'error',
        });
      } else {
        trackError({ error });
      }
    }
  };

  return (
    <Box className="gap-5">
      <FormInput
        control={control}
        label={t('common.input_email_label')}
        name="email"
        placeholder={t('common.input_email_placeholder')}
      />
      <Box>
        <FormInput
          control={control}
          secureTextEntry
          label={t('common.input_password_label')}
          name="password"
          placeholder="••••••••"
        />
        <Link href="/auth/reset-password" asChild>
          <Pressable>
            <String size="sm" className="text-right mt-0.5">
              {t('auth.login.forgot_password')}
            </String>
          </Pressable>
        </Link>
      </Box>
      <Button
        isLoading={loginIsPending}
        title={t('auth.login.button_form_title')}
        onPress={handleSubmit(onSubmit)}
        className="w-full"
        size="lg"
      />
    </Box>
  );
}
