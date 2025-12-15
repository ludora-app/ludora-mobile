import { z } from 'zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Box, useToast } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { Button, FormInput, String } from '@ludo/ui';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuthHelpers } from '@/hooks/auth-helpers.hook';

import { useLogin } from '../queries/login.hook';

const formSchema = z.object({
  email: z.email('Email invalide'),
  password: z.string().min(1, 'Mot de passe est requis'),
});

type LoginFormData = z.infer<typeof formSchema>;

export default function LoginEmailForm() {
  const { t } = useTranslate();
  const { isPending: loginIsPending, mutateAsync: loginMutation } = useLogin();
  const { login } = useAuthHelpers();
  const { toast } = useToast();
  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        const response = await loginMutation({
          data: {
            email: 'amir.398@hotmail.fr',
            password: 'Ludora98@',
          },
        });

        if (!response?.data.accessToken || !response?.data.refreshToken) {
          throw new Error('Invalid response from server');
        }

        await login({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });

        toast({
          message: t('login.success'),
          position: 'top',
          variant: 'success',
        });
      } catch (error) {
        console.log(error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        if (errorMessage.includes('User not found') || errorMessage.includes('Invalid credentials')) {
          toast({
            message: t('login.user_not_found'),
            position: 'top',
            variant: 'error',
          });
        } else if (errorMessage.includes('Network')) {
          toast({
            message: t('common.error_network'),
            position: 'top',
            variant: 'error',
          });
        } else {
          toast({
            message: t('common.error_generic'),
            position: 'top',
            variant: 'error',
          });
        }
      }
    },
    [loginMutation, login, toast, t],
  );

  return (
    <Box className="gap-2">
      <FormInput control={control} label="Email" name="email" placeholder="Email" value="amir.398@hotmail.fr" />
      <FormInput
        control={control}
        hasSecureTextEntry
        label="Mot de passe"
        name="password"
        placeholder="Mot de passe"
        value="Sk43subezero@"
      />
      <String size="sm" className="-mt-3 text-right underline" redirect="/auth/reset-password">
        Mot de passe oublié ?
      </String>
      <Button isLoading={loginIsPending} title="Se connecter" onPress={handleSubmit(onSubmit)} />
    </Box>
  );
}
