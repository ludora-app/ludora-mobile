import { registerImage } from 'assets';
import ROUTES from '@/constants/ROUTES';
import { TIcons } from '@/constants/ICONS';
import { Link, useRouter } from 'expo-router';
import { String, Wrapper, Image, Button, Box } from '@chillUI';

type ButtonsProps = {
  icon: keyof TIcons;
  onPress: () => void;
  title: string;
};

export default function RegisterStep1Screen() {
  const router = useRouter();
  const buttons: ButtonsProps[] = [
    {
      icon: 'envelope-solid',
      onPress: () => router.push(ROUTES.AUTH.REGISTER_STEP_2),
      title: 'Continuer avec Email',
    },
    {
      icon: 'google-solid',
      onPress: () => null,
      title: 'Continuer avec Google',
    },
    {
      icon: 'facebook-solid',
      onPress: () => null,
      title: 'Continuer avec Facebook',
    },
  ];

  return (
    <Wrapper>
      <Box className="flex-1 items-center justify-end gap-3">
        <Image source={registerImage} contentFit="contain" className="h-[40%] w-5/6" />
        <Box className="items-center justify-center gap-3 px-10">
          <String weight="bold" size="2xl" className="text-center">
            Créer un compte
          </String>
          <String weight="semiBold" className="text-center">
            Créez un compte pour accéder à votre espace et profiter de toutes les fonctionnalités de l&apos;application.
          </String>
        </Box>
      </Box>
      <Box className="flex-1 justify-around">
        <Box className="gap-4">
          {buttons.map(button => (
            <Button
              variant="light"
              key={button.title}
              title={button.title}
              leftIcon={button.icon}
              btnClassName="border border-gray-300 shadow-md"
              onPress={button.onPress}
            />
          ))}
        </Box>
        <String weight="semiBold" className="text-center" useFastText={false}>
          Vous avez déjà un compte ?{' '}
          <Link href="/auth/login">
            <String weight="bold" variant="primary" className="text-primary underline" useFastText={false}>
              Connectez-vous
            </String>
          </Link>
        </String>
      </Box>
    </Wrapper>
  );
}
