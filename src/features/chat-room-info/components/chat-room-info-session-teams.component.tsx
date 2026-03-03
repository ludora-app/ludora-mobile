import { useRouter } from 'expo-router'
import { useTranslate } from '@tolgee/react'
import { Box, BoxRow, Button, String } from '@ludo/ui'

import ROUTES from '@/constants/routes.constants'
import { FindOneSessionResponseData } from '@/api/generated/model'
import SessionSectionTeamsCard from '@/features/session/components/session-section/session-section-teams/session-section-teams-card/session-section-teams-card.component'

type ChatRoomInfoSessionTeamsProps = {
  session: FindOneSessionResponseData
  sessionUid: string
}

export default function ChatRoomInfoSessionTeams({ session, sessionUid }: ChatRoomInfoSessionTeamsProps) {
  const { t } = useTranslate()
  const router = useRouter()

  const handleViewMembers = () => {
    router.navigate(ROUTES.SESSION.TEAM_UID(sessionUid))
  }

  return (
    <Box className='gap-3'>
      <BoxRow className='items-center justify-between'>
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

      <SessionSectionTeamsCard session={session} />
    </Box>
  )
}
