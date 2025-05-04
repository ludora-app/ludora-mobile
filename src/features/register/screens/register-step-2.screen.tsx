import { z } from 'zod';
import { registerImage } from 'assets';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/components/chillUI/input/FormInput';
import { Wrapper, Box, String, Image, Button } from '@/components/chillUI';

const formSchema = z
  .object({
    confirmPassword: z.string({ message: 'Confirmation du mot de passe est requise' }),

    email: z.string({ message: 'Ce champ est requis' }).email({ message: 'Email invalide' }),
    firstname: z.string({ message: 'Ce champ est requis' }),
    lastname: z.string({ message: 'Ce champ est requis' }),
    password: z
      .string({ message: 'Mot de passe est requis' })
      .min(12, { message: 'Le mot de passe doit contenir au moins 12 caractères' })
      .refine(val => /[a-z]/.test(val), { message: 'Le mot de passe doit contenir au moins une minuscule' })
      .refine(val => /[A-Z]/.test(val), { message: 'Le mot de passe doit contenir au moins une majuscule' })
      .refine(val => /[^a-zA-Z0-9]/.test(val), {
        message: 'Le mot de passe doit contenir au moins un caractère spécial',
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirmPassword'],
      });
    }
  });

export default function RegisterStep2Screen() {
  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // console.log(data);
  };

  return (
    <Wrapper keyboardAwareScrollView className="justify-between gap-10">
      <Box className="items-center justify-center gap-4">
        <Image source={registerImage} contentFit="contain" className="h-28 w-5/6" />
        <String size="3xl" weight="bold">
          Créer un compte
        </String>
      </Box>
      <Box className="flex-1 justify-center">
        <Box className="flex-row gap-4">
          <Box className="flex-1">
            <FormInput name="firstname" placeholder="Indique ton nom" control={control} label="Nom" required />
          </Box>
          <Box className="flex-1">
            <FormInput name="lastname" placeholder="Indique ton prénom" control={control} label="Prénom" required />
          </Box>
        </Box>
        <FormInput name="email" placeholder="Indique ton email" control={control} label="Email" required />
        <FormInput
          name="password"
          placeholder="Indique ton mot de passe"
          control={control}
          label="Mot de passe"
          required
          secureTextEntry
        />
        <FormInput
          name="confirmPassword"
          placeholder="Confirme ton mot de passe"
          control={control}
          label="Confirmation du mot de passe"
          required
          secureTextEntry
        />
        <Button title="Suivant" onPress={handleSubmit(onSubmit)} btnClassName="mt-5" />
      </Box>
      <String className="text-center" useFastText={false} size="sm">
        En cliquant sur &quot;Suivant&quot;, tu accepte les{' '}
        <String variant="primary" weight="bold" className="underline" useFastText={false} size="sm">
          Conditions d&apos;utilisation
        </String>{' '}
        et la{' '}
        <String variant="primary" weight="bold" className="underline" useFastText={false} size="sm">
          Politique de confidentialité
        </String>
      </String>
    </Wrapper>
  );
}
