import { useEffect, useRef } from 'react';
import { usePostHog } from 'posthog-react-native';

import { useAuthStore } from '@/stores/auth.store';
import { useUserMe } from '@/queries/user-me.query';

export default function PostHogIdentifierInitializer() {
  const lastIdentifiedId = useRef<string | null>(null);
  const posthog = usePostHog();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const { userMe } = useUserMe(isAuthenticated);
  const { email: userEmail, firstname, uid: userId } = userMe ?? {};

  useEffect(() => {
    if (isAuthenticated && userId && userEmail) {
      if (lastIdentifiedId.current !== userId) {
        posthog.identify(userId, {
          email: userEmail,
          name: firstname ?? '',
        });
        lastIdentifiedId.current = userId;
      }
    } else if (!isAuthenticated && lastIdentifiedId.current !== null) {
      posthog.reset();
      lastIdentifiedId.current = null;
    }
  }, [isAuthenticated, posthog, userId, userEmail, firstname]);

  return null;
}
