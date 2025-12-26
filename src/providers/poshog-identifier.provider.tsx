import { useEffect, useRef } from 'react';
import { usePostHog } from 'posthog-react-native';

import { useAuthStore } from '@/stores/auth.store';
import { useUserMe } from '@/queries/user-me.query';

export default function PostHogIdentifierProvider() {
  const lastIdentifiedId = useRef<string | null>(null);
  const posthog = usePostHog();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const { userMe } = useUserMe(isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && userMe?.uid) {
      if (lastIdentifiedId.current !== userMe.uid) {
        posthog.identify(userMe.uid, {
          email: userMe.email,
          name: userMe.firstname,
        });
        lastIdentifiedId.current = userMe.uid;
      }
    } else if (!isAuthenticated && lastIdentifiedId.current !== null) {
      posthog.reset();
      lastIdentifiedId.current = null;
    }
  }, [isAuthenticated, userMe, posthog]);

  return null;
}
