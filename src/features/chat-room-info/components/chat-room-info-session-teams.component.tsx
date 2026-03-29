import { useToast } from '@chillui/ui';
import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import React, { useEffect, useMemo, useState } from 'react';
import { Box, BoxRow, Button, Chip, String } from '@ludo/ui';

import dayjs from '@/lib/dayjs';
import ROUTES from '@/constants/routes.constants';
import { useUserMe } from '@/queries/user-me.query';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { FindOneSessionResponseData } from '@/api/generated/model';
import { useChangeSessionTeam } from '@/queries/change-session-team.query';
import { useChatRoomStore } from '@/features/chat-room/store/chat-room.store';
import SessionTeamsCard from '@/components/ui/session-teams-card/session-teams-card.component';
import { useChatRoomSessionTeam } from '@/features/chat-room/utils/chat-room-session-team.utils';

type ChatRoomInfoSessionTeamsProps = {
  session: FindOneSessionResponseData;
  sessionUid: string;
};

export default function ChatRoomInfoSessionTeams({ session, sessionUid }: ChatRoomInfoSessionTeamsProps) {
  const { t } = useTranslate();
  const router = useRouter();
  const { toast } = useToast();
  const { userMeId } = useUserMe();
  const { trackError } = useAnalytics();
  const { isTeamA } = useChatRoomSessionTeam();
  const addChatRoomInfo = useChatRoomStore(state => state.addChatRoomInfo);

  const [selectedTeamUid, setSelectedTeamUid] = useState<string | null>(null);

  const { isPending: isSwitching, mutateAsync: switchTeam } = useChangeSessionTeam(sessionUid);

  const isFinished = useMemo(() => {
    if (!session?.endDate) return false;
    return dayjs().isAfter(dayjs(session.endDate));
  }, [session.endDate]);

  const joinedTeam = useMemo(() => session.sessionTeams?.find(team => team.isJoined), [session.sessionTeams]);
  const isSwitchingTeam = !!joinedTeam && !!selectedTeamUid && joinedTeam.teamUid !== selectedTeamUid;

  useEffect(() => {
    if (selectedTeamUid && joinedTeam?.teamUid === selectedTeamUid) {
      setSelectedTeamUid(null);
    }
  }, [joinedTeam?.teamUid, selectedTeamUid]);

  const handleViewMembers = () => {
    router.navigate(ROUTES.SESSION.TEAM_UID(sessionUid));
  };

  const handleSelectTeam = (teamUid: string) => {
    if (isFinished) return;
    if (joinedTeam?.teamUid === teamUid || selectedTeamUid === teamUid) {
      setSelectedTeamUid(null);
      return;
    }
    setSelectedTeamUid(teamUid);
  };

  const handleSwitchTeam = async () => {
    if (!selectedTeamUid || !isSwitchingTeam || isFinished) return;
    try {
      await switchTeam(selectedTeamUid);
      addChatRoomInfo({ sessionData: { teamLabel: isTeamA ? 'B' : 'A' } });
      toast({ message: t('session.toast_team_switched_success'), variant: 'success' });
    } catch (error) {
      trackError({ error });
    }
  };

  const handleColorVariant = useMemo(() => (isTeamA ? 'primary' : 'secondary'), [isTeamA]);

  return (
    <Box className="gap-3">
      <BoxRow className="items-center justify-between">
        <String variant="body-sm" font="primaryBold" colorVariant="muted">
          {t('chat-room.info_session_teams')}
        </String>
        <Chip
          title={t('chat-room.info_session_see_members')}
          variant="contained"
          size="2xs"
          contentProps={{
            className: 'px-2',
          }}
          colorVariant={handleColorVariant}
          className="px-0"
          iconProps={{
            className: 'ml-2',
            name: 'arrow-right-regular',
            position: 'right',
          }}
          onPress={handleViewMembers}
        />
      </BoxRow>
      <SessionTeamsCard
        session={session}
        selectedTeamUid={selectedTeamUid}
        onSelectTeam={handleSelectTeam}
        disableSelection={isSwitching || isFinished}
        userMeUid={userMeId}
      />

      {isSwitchingTeam && !isFinished && (
        <Button
          title={t('session.footer_button_change_team')}
          onPress={handleSwitchTeam}
          isLoading={isSwitching}
          colorVariant="primary"
          className="mt-2"
        />
      )}
    </Box>
  );
}
