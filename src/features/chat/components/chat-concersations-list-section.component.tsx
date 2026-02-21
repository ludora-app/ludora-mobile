import React from 'react'
import { useSharedValue } from 'react-native-reanimated';

import ChatConversationsList from './chat-conversations-list.component'
import ChatConversationsListHeaderType from './chat-conversations-header/chat-conversations-header-type.component'

export default function ChatConversationsListSection() {
  const scrollY = useSharedValue(0);
  return (
    <>
      <ChatConversationsListHeaderType scrollY={scrollY} />
      <ChatConversationsList scrollY={scrollY} />
    </>
  )
}