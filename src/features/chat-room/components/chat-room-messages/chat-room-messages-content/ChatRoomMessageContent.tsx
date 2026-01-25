import { Message, MessageType } from '@api/utils/api.types';

import ChatRoomMessageContentText from './ChatRoomMessageContentText';
import ChatRoomMessageContentAudio from './ChatRoomMessageContentAudio';
import ChatRoomMessageContentImage from './ChatRoomMessageContentImage';
import ChatRoomMessageContentImages from './ChatRoomMessageContentImages';

export default function ChatRoomMessageContent({ messageData }: { messageData: Message }) {
  switch (messageData.type) {
    case MessageType.TEXT:
      return <ChatRoomMessageContentText messageData={messageData} />;
    case MessageType.IMAGE:
      return <ChatRoomMessageContentImage messageData={messageData} />;
    case MessageType.IMAGES:
      return <ChatRoomMessageContentImages messageData={messageData} />;
    case MessageType.AUDIO:
      return <ChatRoomMessageContentAudio messageData={messageData} />;
    default:
      return null;
  }
}
