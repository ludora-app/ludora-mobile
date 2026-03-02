import { Image } from '@ludo/ui';
import { useRouter } from 'expo-router';
import { penTool, openBook } from 'assets';
import { FloatingDevTools } from '@buoy-gg/core';
import { FullWindowOverlay } from 'react-native-screens';

import ROUTES from '@/constants/routes.constants';
import { IS_IOS } from '@/constants/platform.constants';

const apiEnv = process.env.EXPO_PUBLIC_ENV;

export default function DevToolsProvider() {
  const router = useRouter();

  if (apiEnv !== 'development' && !__DEV__) {
    return null;
  }


  const content = (
    <FloatingDevTools
      disableHints
      environment="dev"
      userRole="admin"
      defaultFloatingTools={['query']}
      apps={[
        {
          component: undefined,
          icon: <Image source={penTool} className="size-5" />,
          id: 'dev-tools',
          launchMode: 'toggle-only',
          name: 'DevTool',
          onPress: () => router.push(ROUTES.DEV_TOOLS.INDEX),
        },
        {
          component: undefined,
          icon: <Image source={openBook} className="size-5" />,
          id: 'storybook',
          launchMode: 'toggle-only',
          name: 'Storybook',
          onPress: () => router.push(ROUTES.DEV_TOOLS.STORYBOOK),
        },
      ]}
    />
  );
  return IS_IOS ? <FullWindowOverlay>{content}</FullWindowOverlay> : content;
}
