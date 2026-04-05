import Loading from '@/components/ui/loading/loading.component';
import { useChatRoomSessionTeam } from '@/features/chat-room/utils/chat-room-session-team.utils';

export default function ChatRoomMessagesListLoadMoreLoading() {
  const { color } = useChatRoomSessionTeam();

  return <Loading loadingColor={color} />;
}
