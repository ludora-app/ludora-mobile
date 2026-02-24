import { Switch } from 'react-native'
import { useEffect, useState } from 'react'
import { useTranslate } from '@tolgee/react'
import { Box, BoxRow, BoxRowCenter, IconButton, String } from '@ludo/ui'
import { useConversationsUpdateMuteSettings } from '@generatedApi/conversations/conversations.api'

import COLORS from '@/constants/COLORS'
import { useInvalidateConversationsFindOne } from '@/api/generated/invalidate-queries'

type ChatRoomInfoMuteConversationProps = {
  chatRoomId: string
  initialIsMuted: boolean
}

export default function ChatRoomInfoMuteConversation({ chatRoomId, initialIsMuted }: ChatRoomInfoMuteConversationProps) {
  const { t } = useTranslate()
  const [isMuted, setIsMuted] = useState(initialIsMuted)
  const invalidateConversation = useInvalidateConversationsFindOne()
  const { mutateAsync: updateMuteSettings } = useConversationsUpdateMuteSettings()

  useEffect(() => {
    setIsMuted(initialIsMuted)
  }, [initialIsMuted])

  const handleToggleMute = async () => {
    const newMuted = !isMuted
    setIsMuted(newMuted)

    try {
      await updateMuteSettings({ data: { isMuted: newMuted }, uid: chatRoomId })
      invalidateConversation(chatRoomId)
    } catch {
      setIsMuted(isMuted)
    }
  }

  return (
    <BoxRowCenter className='justify-between rounded-xl bg-white p-4'>
      <BoxRow className='items-center gap-3'>
        <IconButton
          iconName="bell-regular"
          rounded="circle"
          size="sm"
          colorVariant="white"
          iconColor={COLORS.muted}
        />
        <Box>
          <String font="primarySemiBold">{t('chat.info_mute_conversation', 'Muet')}</String>
          <String variant="body-sm" colorVariant="muted">
            {isMuted
              ? t('chat.info_mute_active', 'Les notifications sont désactivées')
              : t('chat.info_mute_inactive', 'Les notifications sont activées')
            }
          </String>
        </Box>
      </BoxRow>
      <Switch
        value={isMuted}
        onValueChange={handleToggleMute}
        trackColor={{ false: COLORS.input, true: COLORS.primary }}
      />
    </BoxRowCenter>
  )
}
