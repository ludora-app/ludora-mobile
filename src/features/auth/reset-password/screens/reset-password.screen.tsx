import { View, Text } from 'react-native';
import React from 'react';
import { useTranslate } from '@tolgee/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, ResetPasswordFormData } from '../schemas/reset-password.schema';
import { WrapperSafeAreaView } from '@chillui/ui';
import { FormInput, Button } from '@ludo/ui';

export default function ResetPasswordScreen() {
  const { t } = useTranslate();

  const { control, handleSubmit } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log(data);
  };

  return (
    <WrapperSafeAreaView className="gap-2">
      <FormInput control={control} label="Email" name="email" placeholder="Email" />
      <Button title="Envoyer" onPress={handleSubmit(onSubmit)} />
    </WrapperSafeAreaView>
  );
}
