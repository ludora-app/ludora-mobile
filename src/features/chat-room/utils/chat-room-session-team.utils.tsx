import { useMemo } from 'react';

import { useSessionTeam } from '@/hooks/session-teams.hook';

import { useChatRoomStore } from '../context/chat-room-store-context';

export const useChatRoomSessionTeam = () => {
  const chatRoomInfo = useChatRoomStore(state => state.chatRoomInfo);
  const { sessionData, type } = chatRoomInfo || {};
  const sessionTeamData = useSessionTeam(sessionData);
  return useMemo(() => ({ ...sessionTeamData, type }), [sessionTeamData, type]);
};
