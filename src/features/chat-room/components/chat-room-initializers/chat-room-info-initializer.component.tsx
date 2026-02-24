import { isString } from 'radash';
import { useEffect, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router'

import { parse } from '@/utils/json.utils';
import { FindOneConversationResponseDataType, ReceiverDto } from '@/api/generated/model';

import { useChatRoomStore } from '../../store/chat-room.store';
import { ChatRoomLocalSearchParams } from '../../types/chat-room.types';
import { useGetChatRoomById } from '../../queries/get-chat-room-by-id.query';


type ChatRoomReceiver = ReceiverDto

export default function ChatRoomInfoInitializer() {
  const chatRoomId = useChatRoomStore(state => state.chatRoomId)
  const setChatRoomInfo = useChatRoomStore(state => state.setChatRoomInfo)
  const params = useLocalSearchParams<ChatRoomLocalSearchParams>();
  const chatRoomType = params.type !== 'undefined' ? params.type as FindOneConversationResponseDataType : undefined;
  const chatRoomName = params.name !== 'undefined' ? params.name : undefined;
  const chatRoomAvatar = params.imageUrl !== 'undefined' ? params.imageUrl : undefined;
  const paramsReceiver = params.receiver !== 'undefined' ? params.receiver : undefined;
  const chatRoomReceiver: ChatRoomReceiver | null = useMemo(() => {
    if (!paramsReceiver || !isString(paramsReceiver)) return null;
    try {
      return parse(paramsReceiver);
    } catch {
      return null;
    }
  }, [paramsReceiver]);


  const isPrivate = chatRoomType === 'PRIVATE';
  const hasBasicInfo = !!chatRoomName && !!chatRoomAvatar && !!chatRoomType;
  const hasReceiverIfRequired = isPrivate ? !!chatRoomReceiver : true;
  const shouldFetchChatRoomInfo = !!chatRoomId && (!hasBasicInfo || !hasReceiverIfRequired);


  const { data: chatRoom } = useGetChatRoomById({ convId: chatRoomId, enabled: shouldFetchChatRoomInfo })

  useEffect(() => {
    if (!shouldFetchChatRoomInfo) {
      setChatRoomInfo({ imageUrl: chatRoomAvatar, name: chatRoomName, receiver: chatRoomReceiver, type: chatRoomType })
      return
    }
    if (chatRoom) {
      setChatRoomInfo(chatRoom)
    }
  }, [chatRoom, setChatRoomInfo, chatRoomAvatar, chatRoomName, chatRoomType, chatRoomReceiver, shouldFetchChatRoomInfo])

  return null
}