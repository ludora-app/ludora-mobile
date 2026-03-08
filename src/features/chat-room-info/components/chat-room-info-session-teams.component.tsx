import { useToast } from '@chillui/ui'
import { useRouter } from 'expo-router'
import { useTranslate } from '@tolgee/react'
import React, { useMemo, useState } from 'react'
import { Box, BoxRow, Button, String } from '@ludo/ui'

import ROUTES from '@/constants/routes.constants'
import { useUserMe } from '@/queries/user-me.query'
import { useAnalytics } from '@/hooks/analytics-trackers.hook'
import { FindOneSessionResponseData } from '@/api/generated/model'
import { useChangeSessionTeam } from '@/queries/change-session-team.query'
import SessionTeamsCard from '@/components/ui/session-teams-card/session-teams-card.component'

type ChatRoomInfoSessionTeamsProps = {
  session: FindOneSessionResponseData
  sessionUid: string
}

export default function ChatRoomInfoSessionTeams({ session, sessionUid }: ChatRoomInfoSessionTeamsProps) {
  const { t } = useTranslate()
  const router = useRouter()
  const { toast } = useToast()
  const { userMeId } = useUserMe()
  const { trackError } = useAnalytics()

  const [selectedTeamUid, setSelectedTeamUid] = useState<string | null>(null)

  const { isPending: isSwitching, mutateAsync: switchTeam } = useChangeSessionTeam(sessionUid)

  const joinedTeam = useMemo(() => session.sessionTeams?.find(team => team.isJoined), [session.sessionTeams])
  const isSwitchingTeam = !!joinedTeam && !!selectedTeamUid && joinedTeam.teamUid !== selectedTeamUid

  const handleViewMembers = () => {
    router.navigate(ROUTES.SESSION.TEAM_UID(sessionUid))
  }

  const handleSelectTeam = (teamUid: string) => {
    if (joinedTeam?.teamUid === teamUid || selectedTeamUid === teamUid) {
      setSelectedTeamUid(null)
      return
    }
    setSelectedTeamUid(teamUid)
  }

  const handleSwitchTeam = async () => {
    if (!selectedTeamUid || !isSwitchingTeam) return
    try {
      await switchTeam(selectedTeamUid)
      toast({ message: t('session.toast_team_switched_success'), variant: 'success' })
      setSelectedTeamUid(null)
    } catch (error) {
      trackError({ error })
    }
  }

  return (
    <Box className="gap-3">
      <BoxRow className="items-center justify-between">
        <String variant="body-sm" font="primaryBold" colorVariant="muted">
          {t('chat-room.info_session_teams')}
        </String>
        <Button
          title={t('chat-room.info_session_see_members')}
          size="2xs"
          colorVariant="primary"
          onPress={handleViewMembers}
          fit
        />
      </BoxRow>

      <SessionTeamsCard
        session={session}
        selectedTeamUid={selectedTeamUid}
        onSelectTeam={handleSelectTeam}
        disableSelection={isSwitching}
        userMeUid={userMeId}
      />

      {isSwitchingTeam && (
        <Button
          title={t('session.footer_button_change_team')}
          onPress={handleSwitchTeam}
          isLoading={isSwitching}
          colorVariant="primary"
          className="mt-2"
        />
      )}
    </Box>
  )
}
