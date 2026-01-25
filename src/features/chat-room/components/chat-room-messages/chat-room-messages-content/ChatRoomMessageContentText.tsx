import { useUserMe } from '@/queries';
import { String } from '@components/nysaUi';
import { Message } from '@api/utils/api.types';

export default function ChatRoomMessageContentText({ messageData }: { messageData: Message }) {
  const { data: userMe } = useUserMe();
  const isMessageFromMe = messageData.user_id === userMe?.id;

  return (
    <String variant={isMessageFromMe ? 'light' : 'dark'} weight="semiBold" size="sm">
      {messageData.content}
    </String>
  );
}
