import { StatusBar } from 'expo-status-bar';
import { ImageBackground } from 'expo-image';
import { Button, Image, String, Wrapper, Box } from '@chillUI';
import { welcomeScreenImageBackground2, bigLogo } from 'assets';

export default function WelcomeComponent() {
  return (
    <ImageBackground source={welcomeScreenImageBackground2} style={{ flex: 1 }}>
      <StatusBar hidden />
      <Wrapper>
        <Box className="flex-1 items-center justify-center">
          <Image source={bigLogo} contentFit="contain" className="h-56 w-5/6" />
        </Box>
        <Box className="flex-1 justify-end gap-16">
          <Box className="gap-3">
            <String
              variant="white"
              weight="bold"
              size="4xl"
              style={{ textShadowColor: 'black', textShadowOffset: { height: 2, width: 2 }, textShadowRadius: 10 }}
              className="text-center"
            >
              Rejoins le jeu.
            </String>
            <String variant="white" weight="semiBold" size="lg" className="text-center">
              Rejoignez des milliers de sportifs passionnés.
            </String>
          </Box>
          <Box className="gap-4">
            <Button title="Se connecter" onPress={() => null} />
            <Button variant="light" title="Créer un compte" onPress={() => null} />
          </Box>
        </Box>
      </Wrapper>
    </ImageBackground>
  );
}
