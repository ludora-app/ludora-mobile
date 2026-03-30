import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router'

import { ChatRoomLocalSearchParams } from '../../types/chat-room.types';
import { useChatRoomStore } from '../../context/chat-room-store-context';
import { useGetChatRoomConvIdByUserId } from '../../queries/get-chat-room-conv-id-by-user-id.query';


export default function ChatRoomIdInitializer() {
  const params = useLocalSearchParams<ChatRoomLocalSearchParams>();
  const chatRoomId = params.chatRoomId !== 'undefined' ? params.chatRoomId : undefined;

  const userUid = params.userUid !== 'undefined' ? params.userUid : undefined;
  const setChatRoomId = useChatRoomStore(state => state.setChatRoomId)
  const setChatRoomUserId = useChatRoomStore(state => state.setChatRoomUserId)
  const { data: chatRoomConvId, isLoading: isLoadingChatRoomConvId } = useGetChatRoomConvIdByUserId(userUid)
  const { conversationUid } = chatRoomConvId || {}
  const isResolvingConvId = !!userUid && isLoadingChatRoomConvId
  const chatRoomConversationId = chatRoomId || conversationUid

  useEffect(() => {
    if (isResolvingConvId) return

    if (chatRoomConversationId) {
      setChatRoomId(chatRoomConversationId)
      setChatRoomUserId(null)
      return
    }
    if (userUid) {
      setChatRoomId(null)
      setChatRoomUserId(userUid)
    }
  }, [chatRoomConversationId, setChatRoomId, userUid, setChatRoomUserId, isResolvingConvId])

  return null
}