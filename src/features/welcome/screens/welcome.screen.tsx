import { StyleSheet } from 'react-native';
import { ImageBackground } from 'expo-image';
import { Wrapper, Box, Icon } from '@chillui/ui';
import { Button, String, Image } from '@ludo/ui';
import { welcomeScreenImageBackground2, bigLogo } from 'assets';

export default function WelcomeComponent() {
  return (
    <ImageBackground source={welcomeScreenImageBackground2} style={StyleSheet.absoluteFillObject}>
      <Wrapper>
        <Box className="flex-1 items-center justify-center">
          <Image source={bigLogo} contentFit="contain" className="h-56 w-5/6" />
        </Box>
        <Box className="flex-1 justify-end gap-16">
          <Box className="gap-3">
            <Icon name="ludo" />
            <String
              size="4xl"
              style={{ textShadowColor: 'black', textShadowOffset: { height: 2, width: 2 }, textShadowRadius: 10 }}
              className="text-center"
            >
              Rejoins le jeu.
            </String>
            <String size="lg" className="text-center">
              Rejoignez des milliers de sportifs passionnés.
            </String>
          </Box>
          <Box className="mb-10 gap-4">
            <Button title="Commencer le jeu" size="xl" redirect="/auth/login" className="w-full" />
            <Button
              title="Rejoindre le jeu"
              variant="outlined"
              colorVariant="white"
              redirect="/auth/register/step-1"
              className="w-full"
              size="xl"
            />
          </Box>
        </Box>
      </Wrapper>
    </ImageBackground>
  );
}
