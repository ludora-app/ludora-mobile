import { isString } from 'radash';
import { useEffect, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { parse } from '@/utils/json.utils';
import { FindOneConversationResponseDataType, ReceiverDto, SessionData } from '@/api/generated/model';

import { ChatRoomLocalSearchParams } from '../../types/chat-room.types';
import { useChatRoomStore } from '../../context/chat-room-store-context';
import { useGetChatRoomById } from '../../queries/get-chat-room-by-id.query';

type ChatRoomReceiver = ReceiverDto;

export default function ChatRoomInfoInitializer() {
  const chatRoomId = useChatRoomStore(state => state.chatRoomId);
  const setChatRoomInfo = useChatRoomStore(state => state.setChatRoomInfo);
  const isStoreInitialized = useChatRoomStore(state => state.chatRoomInfo !== null);
  const params = useLocalSearchParams<ChatRoomLocalSearchParams>();
  const paramChatRoomId = params.chatRoomId !== 'undefined' ? params.chatRoomId : undefined;
  const chatRoomType = params.type !== 'undefined' ? (params.type as FindOneConversationResponseDataType) : undefined;
  const chatRoomName = params.name !== 'undefined' ? params.name : undefined;
  const chatRoomAvatar = params.imageUrl !== 'undefined' ? params.imageUrl : undefined;
  const paramsReceiver = params.receiver !== 'undefined' ? params.receiver : undefined;
  const sessionData = params.sessionData !== 'undefined' ? params.sessionData : undefined;
  const chatRoomReceiver: ChatRoomReceiver | null = useMemo(() => {
    if (!paramsReceiver || !isString(paramsReceiver)) return null;
    try {
      return parse(paramsReceiver);
    } catch {
      return null;
    }
  }, [paramsReceiver]);

  const chatRoomSessionData: SessionData | null = useMemo(() => {
    if (!sessionData || !isString(sessionData)) return null;
    try {
      return parse(sessionData);
    } catch {
      return null;
    }
  }, [sessionData]);

  const isPrivate = chatRoomType === 'PRIVATE';
  const hasBasicInfo = !!chatRoomName && !!chatRoomType;
  const hasReceiverIfRequired = isPrivate ? !!chatRoomReceiver : true;
  const hasTeamLabelIfRequired = !isPrivate ? !!chatRoomSessionData?.teamLabel : true;
  const hasCompleteParamsFromNavigation = hasBasicInfo && hasReceiverIfRequired && hasTeamLabelIfRequired;
  const effectiveChatRoomId = paramChatRoomId ?? chatRoomId ?? null;
  const shouldFetchChatRoomInfo =
    !!effectiveChatRoomId && (!hasBasicInfo || !hasReceiverIfRequired || !hasTeamLabelIfRequired);
  const { data: chatRoom } = useGetChatRoomById({
    convId: effectiveChatRoomId ?? '',
    enabled: shouldFetchChatRoomInfo,
  });

  useEffect(() => {
    if (isStoreInitialized) return;

    if (!shouldFetchChatRoomInfo && hasCompleteParamsFromNavigation) {
      setChatRoomInfo({
        imageUrl: chatRoomAvatar,
        name: chatRoomName,
        receiver: chatRoomReceiver,
        sessionData: chatRoomSessionData,
        type: chatRoomType,
      });
      return;
    }
    if (shouldFetchChatRoomInfo && chatRoom) {
      setChatRoomInfo(chatRoom);
    }
  }, [
    isStoreInitialized,
    chatRoom,
    setChatRoomInfo,
    chatRoomAvatar,
    chatRoomName,
    chatRoomType,
    chatRoomReceiver,
    shouldFetchChatRoomInfo,
    hasCompleteParamsFromNavigation,
    chatRoomSessionData,
  ]);

  return null;
}
