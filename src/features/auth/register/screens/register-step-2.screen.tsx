import { registerImage } from 'assets';
import { useForm } from 'react-hook-form';
import { Box, useToast } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image, Wrapper, String, Button, FormInput } from '@ludo/ui';

import { useAuthHelpers } from '@/hooks/auth-helpers.hook';

import { useRegister } from '../queries/register.hook';
import { formSchema, formSchemaType } from '../schemas/register-step-2.schema';

const EMAIL_ALREADY_EXISTS_ERROR_MESSAGE = 'User already exists';

export default function RegisterStep2Screen() {
  const { mutateAsync: registerUser } = useRegister();
  const { t } = useTranslate();
  const { login } = useAuthHelpers();
  const { toast } = useToast();
  const { control, handleSubmit } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: formSchemaType) => {
    try {
      const response = await registerUser({
        data: {
          ...data,
          birthdate: new Date('1990-01-01').toISOString(),
          type: 'USER',
        },
      });
      const accessToken = response?.data.accessToken;
      const refreshToken = response?.data.refreshToken;
      login({ accessToken, refreshToken });
    } catch (error) {
      if (error.message === EMAIL_ALREADY_EXISTS_ERROR_MESSAGE) {
        toast({
          message: t('auth.email_already_exists'),
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
  };

  return (
    <Wrapper keyboardAwareScrollView className="justify-between gap-10">
      <Box className="items-center justify-center gap-4">
        <Image source={registerImage} contentFit="contain" className="h-28 w-5/6" />
        <String size="3xl">Créer un compte</String>
      </Box>
      <Box className="flex-1 justify-center">
        <Box className="flex-row gap-4">
          <Box className="flex-1">
            <FormInput name="firstname" placeholder="Indique ton nom" control={control} label="Nom" />
          </Box>
          <Box className="flex-1">
            <FormInput name="lastname" placeholder="Indique ton prénom" control={control} label="Prénom" />
          </Box>
        </Box>
        <FormInput name="email" placeholder="Indique ton email" control={control} label="Email" />
        <FormInput
          name="password"
          placeholder="Indique ton mot de passe"
          control={control}
          label="Mot de passe"
          hasSecureTextEntry
        />
        <FormInput
          name="confirmPassword"
          placeholder="Confirme ton mot de passe"
          control={control}
          label="Confirmation du mot de passe"
          hasSecureTextEntry
        />
        <Button title="Suivant" onPress={handleSubmit(onSubmit)} />
      </Box>
      <String className="text-center" useFastText={false} size="sm">
        En cliquant sur &quot;Suivant&quot;, tu accepte les{' '}
        <String className="underline" useFastText={false} size="sm">
          Conditions d&apos;utilisation
        </String>{' '}
        et la{' '}
        <String className="underline" useFastText={false} size="sm">
          Politique de confidentialité
        </String>
      </String>
    </Wrapper>
  );
}
