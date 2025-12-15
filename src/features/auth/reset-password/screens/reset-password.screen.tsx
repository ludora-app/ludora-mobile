import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { WrapperSafeAreaView, FormInput, Button, String } from '@ludo/ui';

import { formSchema, ResetPasswordFormData } from '../schemas/reset-password.schema';

export default function ResetPasswordScreen() {
  const { t } = useTranslate();

  const { control, handleSubmit } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log(data);
  };

  return (
    <WrapperSafeAreaView>
      <String variant="title-2" font="primaryExtraBold" className="mb-3">
        Mot de passe oublié ?
      </String>
      <String>Pas de problème, ça arrive ! {'\n'}Saisit l’adresse e-mail associée à ton profil.</String>
      <FormInput control={control} label="Email" name="email" placeholder="Email" containerClassName="my-5" />
      <Button title="Envoyer" onPress={handleSubmit(onSubmit)} className="w-full" size="lg" />
    </WrapperSafeAreaView>
  );
}
