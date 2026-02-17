import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router'

import { useChatRoomStore } from '../store/chat-room.store';

export default function ChatRoomInitializer() {
  const setChatRoomId = useChatRoomStore(state => state.setChatRoomId)
  const { id: chatRoomId } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    setChatRoomId(chatRoomId)
  }, [chatRoomId, setChatRoomId])

  return null
}