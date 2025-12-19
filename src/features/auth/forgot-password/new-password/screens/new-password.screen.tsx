import { z } from 'zod/v4-mini';
import { useForm } from 'react-hook-form';
import { Box, useToast } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { useLocalSearchParams } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { WrapperSafeAreaView, FormInput, Button } from '@ludo/ui';

import { useAuthHelpers } from '@/hooks/auth-helpers.hook';

import { formSchema } from '../schemas/new-password.schema';
import { useNewPassword } from '../queries/new-password.query';
import AuthHeader from '../../components/auth-header/ auth-header.component';
import ContentWapper from '../../components/content-wrapper/content-wrapper.component';

export default function NewPasswordScreen() {
  const { t } = useTranslate();
  const { login } = useAuthHelpers();
  const { toast } = useToast();
  const { resetToken } = useLocalSearchParams();
  const { isPending: isAddingNewPassword, mutateAsync: addNewPassword } = useNewPassword(resetToken.toString());
  const newPasswordFormSchema = formSchema(t);
  const { control, handleSubmit } = useForm<z.infer<typeof newPasswordFormSchema>>({
    resolver: zodResolver(newPasswordFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof newPasswordFormSchema>) => {
    const { newPassword } = data;
    try {
      const response = await addNewPassword({ data: { newPassword } });
      login(response.data);
    } catch {
      toast({
        message: t('common.error_generic'),
        variant: 'error',
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
