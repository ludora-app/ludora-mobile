import { useSessionTeam } from '@/hooks/session-teams.hook';

import { useChatRoomStore } from '../context/chat-room-store-context';

export const useChatRoomSessionTeam = () => {
  const { chatRoomInfo } = useChatRoomStore();
  const { sessionData, type } = chatRoomInfo || {};
  const sessionTeamData = useSessionTeam(sessionData);
  return { ...sessionTeamData, type };
};
