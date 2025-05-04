import { Box } from '@chillUI';
import { useMemo } from 'react';
import { headerImg } from 'assets';
import { usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HeaderHome from './Header-home.component';
import HeaderTitle from './Header.title.component';
import HeaderProfil from './header-profil.component';

export default function Header() {
  const { top } = useSafeAreaInsets();
  // get the active screen
  const pathname = usePathname();

  const headerComponent = useMemo(() => {
    // if the pathname is not a tab router, return null

    switch (pathname) {
      case '/':
        return <HeaderHome />;
      case '/favoris':
        return <HeaderTitle title="Mes favoris" />;
      case '/messages':
        return <HeaderTitle title="Mes messages" />;
      case '/match':
        return <HeaderTitle title="Mes matchs" />;
      case '/profil':
        return <HeaderProfil />;
      default:
        return <HeaderHome />;
    }
  }, [pathname]);

  return (
    <ImageBackground source={headerImg} className="w-full rounded-b-3xl">
      <StatusBar />
      <Box className="p-4" style={{ paddingTop: top + 5 }}>
        {headerComponent}
      </Box>
    </ImageBackground>
  );
}
