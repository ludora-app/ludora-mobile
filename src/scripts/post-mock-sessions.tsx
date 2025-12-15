import { generateMockSessions } from '@/mocks/sessions.mock';
import { useSessionsCreate } from '@/api/generated/api/sessions/sessions.api';

export function PostMockSessionsScript() {
  const { isPending, mutate: createSession } = useSessionsCreate();

  const handlePostSessions = async () => {
    const sessions = generateMockSessions(10, 'YOUR_USER_UID_HERE');

    sessions.forEach((session, index) => {
      setTimeout(() => {
        createSession(
          { data: session },
          {
            onError: error => {
              // eslint-disable-next-line no-console
              console.error(`❌ Failed to post session ${index + 1}:`, error);
            },
            onSuccess: () => {
              // eslint-disable-next-line no-console
              console.log(`✅ Session ${index + 1} posted successfully`);
            },
          },
        );
      }, index * 500);
    });
  };

  return (
    <button
      type="button"
      onClick={handlePostSessions}
      disabled={isPending}
      style={{
        backgroundColor: isPending ? '#ccc' : '#007bff',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        cursor: isPending ? 'not-allowed' : 'pointer',
        padding: '10px 20px',
      }}
    >
      {isPending ? 'Posting Sessions...' : 'Post Mock Sessions'}
    </button>
  );
}
