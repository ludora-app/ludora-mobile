import { useUserMe } from '@/queries';
import { memo, useMemo } from 'react';
import COLORS from '@constants/COLORS';
import { Message } from '@api/utils/api.types';
import { formatTimestampToTime } from '@utils/time';
import { useRoute } from '@react-navigation/native';
import { cn, String, Spinner, Icon, Box, Avatar } from '@components/nysaUi';

import { useGetUserDataByMessageId } from '../../queries/useGetUserDataByMessageId';
import ChatRoomMessageContent from './chat-room-messages-content/ChatRoomMessageContent';

interface ChatRoomMessageWrapperProps {
  messageData: Message;
}

function ChatRoomMessageWrapper({ messageData }: ChatRoomMessageWrapperProps) {
  const { data: userMe } = useUserMe();
  const { isGroup } = useRoute().params as {
    isGroup: boolean;
  };

  const isMessageFromMe = messageData.user_id === userMe?.id;
  const { data: messageUserData } = useGetUserDataByMessageId(messageData.user_id, !isMessageFromMe);
  const isMessageReadByMinOneMember = useMemo(() => {
    return isMessageFromMe && messageData.message_reads && messageData.message_reads.some(read => read.is_read);
  }, [isMessageFromMe, messageData.message_reads]);

  const isAllMembersRead = useMemo(() => {
    return (
      isMessageFromMe &&
      messageData.message_reads &&
      messageData.message_reads.some(read => read.is_read) &&
      messageData.message_reads.every(read => read.is_read)
    );
  }, [isMessageFromMe, messageData.message_reads]);

  const isMessageSending = Boolean(messageData.isSending);

  return (
    <Box className={cn(isMessageFromMe ? 'items-end' : 'items-start', 'mb-2')}>
      <Box className="max-w-[80%]">
        <Box className="flex flex-row items-end gap-1 justify-end">
          {!isMessageFromMe && isGroup && (
            <Avatar
              size="2xs"
              userData={{
                firstname: messageUserData?.firstname ?? '',
                image_url: messageUserData?.image_url ?? '',
                lastname: messageUserData?.lastname ?? '',
              }}
            />
          )}
          <Box className="flex-shrink">
            <Box className={cn('p-2 rounded-lg ', isMessageFromMe ? ' bg-primary' : 'bg-secondary')}>
              <ChatRoomMessageContent messageData={messageData} />
            </Box>
          </Box>
        </Box>
        <Box className="flex-row items-center gap-1 self-end mr-1 ">
          {isMessageFromMe && (
            <>
              {isMessageSending ? (
                <Spinner color={COLORS.btnSecondaryColor} size="2xs" />
              ) : (
                <Box className="flex-row items-center">
                  {isMessageReadByMinOneMember && (
                    <Icon
                      variant="check-solid"
                      size="2xs"
                      color={isAllMembersRead ? COLORS.btnColor : COLORS.btnSecondaryColor}
                      className="-mr-1"
                    />
                  )}
                  <Icon
                    variant="check-solid"
                    size="2xs"
                    color={isAllMembersRead ? COLORS.btnColor : COLORS.btnSecondaryColor}
                  />
                </Box>
              )}
            </>
          )}
          <String variant="light" size="2xs">
            {formatTimestampToTime(messageData.created_at, 'HH:mm')}
          </String>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(ChatRoomMessageWrapper, (prevProps, nextProps) => {
  return (
    prevProps.messageData.id === nextProps.messageData.id &&
    prevProps.messageData.message_reads === nextProps.messageData.message_reads &&
    prevProps.messageData.isSending === nextProps.messageData.isSending
  );
});
