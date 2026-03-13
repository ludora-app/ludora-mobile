import React from 'react'
import { Box } from '@ludo/ui';
import { cn } from '@chillui/ui';
import { StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { IS_ANDROID } from '@/constants/platform.constants';

import ChatConversationsList from './chat-conversations-list.component'
import ChatConversationsListHeaderType from './chat-conversations-header/chat-conversations-header-type.component'
import ChatConversationsHeaderSearch from './chat-conversations-header/chat-conversations-header-search.component';

const styles = StyleSheet.create({
  headerContainer: {
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
});

export default function ChatConversationsListSection() {
  const scrollY = useSharedValue(0);
  return (
    <>
      <Box style={styles.headerContainer} className={cn('rounded-b-2xl', { "border-b-2 border-ring/20": IS_ANDROID })}>
        <Box>
          <ChatConversationsHeaderSearch />
          <ChatConversationsListHeaderType scrollY={scrollY} />
        </Box>
      </Box>
      <ChatConversationsList scrollY={scrollY} />
    </>
  )
}