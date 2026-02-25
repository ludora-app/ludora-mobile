import { Box, Button } from '@ludo/ui'
import { useRouter } from 'expo-router'
import { useTranslate } from '@tolgee/react'

import ROUTES from '@/constants/routes.constants'
import COLORS from '@/constants/colors.contstants'
import { ErrorResponse } from '@/api/orval.instance'
import { useAnalytics } from '@/hooks/analytics-trackers.hook'
import { FindOneSessionResponseData } from '@/api/generated/model'
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants'

import { useLeaveSession } from '../queries/leave-session.query'

type ChatRoomInfoSessionActionsProps = {
  sessionUid: string
  session: FindOneSessionResponseData
}

export default function ChatRoomInfoSessionActions({ session, sessionUid }: ChatRoomInfoSessionActionsProps) {
  const { trackError, trackEvent } = useAnalytics()
  const { t } = useTranslate()
  const router = useRouter()
  const { isPending: isLeavingSession, mutateAsync: leaveSession } = useLeaveSession(sessionUid)
  const { isJoined } = session || {}


  const handleInviteFriends = () => {
    router.push(ROUTES.INVITE_FRIENDS.INDEX_UID(sessionUid))
  }

  const handleLeaveMatch = async () => {
    try {
      await leaveSession()
      router.dismissAll()
      trackEvent({ data: { session_uid: sessionUid }, eventName: ANALYTICS_EVENTS.SESSION.SESSION_LEFT })
    } catch (error) {
      const errorResponse = error as ErrorResponse
      trackEvent({
        data: { error_message: errorResponse.api_error_detail, session_uid: sessionUid },
        eventName: ANALYTICS_EVENTS.SESSION.SESSION_LEFT_FAILED
      })
      trackError({ error })
    }
  }

  return (
    <Box className='gap-3'>
      <Button
        title={t('chat.info_session_invite_friends', 'Inviter des amis')}
        iconProps={{ className: "mr-2", name: "user-add-solid", position: 'left' }}
        colorVariant="primary"
        onPress={handleInviteFriends}
      />

      {isJoined && (
        <Button
          title={t('chat.info_session_leave', 'Quitter le match')}
          iconProps={{ className: "mr-2", color: COLORS.danger, name: 'close-circle-regular', position: 'left' }}
          colorVariant="danger"
          variant="outlined"
          onPress={handleLeaveMatch}
          isLoading={isLeavingSession}
          loaderProps={{ color: COLORS.danger }}
        />
      )}

    </Box>
  )
}
