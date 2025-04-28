import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Box, Button, String } from '@chillUI';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/components/chillUI/input/FormInput';

const formSchema = z.object({
  email: z.string({ message: 'Email est requis' }).email({ message: 'Email invalide' }),
  password: z.string({ message: 'Mot de passe est requis' }),
});

export default function LoginEmailForm() {
  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // console.log(data);
  };

  return (
    <Box>
      <FormInput name="email" placeholder="Email" control={control} label="Email" required />
      <FormInput name="password" placeholder="Mot de passe" control={control} label="Mot de passe" required />
      <String size="sm" weight="bold" className="-mt-3 text-right underline">
        Mot de passe oublié ?
      </String>
      <Button title="Se connecter" onPress={handleSubmit(onSubmit)} btnClassName="mt-4" />
    </Box>
  );
}
