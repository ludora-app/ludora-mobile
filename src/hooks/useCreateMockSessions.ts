import { useCallback } from 'react';

import { generateMockSessions } from '@/mocks/sessions.mock';
import { useSessionsCreate } from '@/api/generated/api/sessions/sessions.api';

interface UseCreateMockSessionsOptions {
  count?: number;
  userUid?: string;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useCreateMockSessions = (options?: UseCreateMockSessionsOptions) => {
  const { count = 10, onError, onSuccess, userUid = 'test-user' } = options ?? {};
  const { isPending, mutate: createSession } = useSessionsCreate();

  const createMockSessions = useCallback(() => {
    const sessions = generateMockSessions(count, userUid);
    console.log('createdSessions', sessions);
    let successCount = 0;
    let errorCount = 0;

    sessions.forEach((session, index) => {
      setTimeout(() => {
        createSession(
          { data: session },
          {
            onError: error => {
              errorCount += 1;
              // eslint-disable-next-line no-console
              console.error(`❌ Failed to post session ${index + 1}:`, error);

              if (errorCount + successCount === sessions.length && onError) {
                onError(error);
              }
            },
            onSuccess: () => {
              successCount += 1;
              // eslint-disable-next-line no-console
              console.log(`✅ Session ${index + 1} posted successfully`);

              if (successCount + errorCount === sessions.length && onSuccess) {
                onSuccess();
              }
            },
          },
        );
      }, index * 500);
    });
  }, [count, createSession, onError, onSuccess, userUid]);

  return { createMockSessions, isPending };
};
