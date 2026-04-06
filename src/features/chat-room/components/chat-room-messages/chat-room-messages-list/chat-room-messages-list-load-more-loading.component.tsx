import { Box } from '@ludo/ui';
import { LoadingIndicator } from '@chillui/ui';

import { useChatRoomSessionTeam } from '@/features/chat-room/utils/chat-room-session-team.utils';

export default function ChatRoomMessagesListLoadMoreLoading({ isFetchingNextPage }: { isFetchingNextPage: boolean }) {
  const { color } = useChatRoomSessionTeam();

  if (!isFetchingNextPage) {
    return null;
  }

  return (
    <Box className="items-center justify-center">
      <LoadingIndicator name="swing" color={color} size="xl" />
    </Box>
  );
}
