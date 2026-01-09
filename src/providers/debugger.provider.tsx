import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { penTool, openBook } from 'assets';
import { FloatingDevTools } from '@buoy-gg/core';

import ROUTES from '@/constants/ROUTES';

export default function DebuggerProvider() {
  const router = useRouter();
  return (
    <FloatingDevTools
      disableHints
      environment="local"
      userRole="admin"
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
}
