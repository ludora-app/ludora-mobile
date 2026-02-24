import { Box, String } from '@ludo/ui'
import { useTranslate } from '@tolgee/react'

import { SessionCard } from '@/components/ui/session-card'
import { FindOneSessionResponseData } from '@/api/generated/model'

type ChatRoomInfoSessionDetailsProps = {
  session: FindOneSessionResponseData
}

export default function ChatRoomInfoSessionDetails({ session }: ChatRoomInfoSessionDetailsProps) {
  const { t } = useTranslate()

  return (
    <Box className='gap-3'>
      <String variant="body-sm" font="primaryBold" colorVariant="muted">
        {t('chat-room.info_session_details')}
      </String>
      <SessionCard item={session} />
    </Box>
  )
}
