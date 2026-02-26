import { useTranslate } from '@tolgee/react'
import { BoxRow, IconButton, Link } from '@ludo/ui'
import { Box, BoxRowGrow, cn, OutlinedString, Wrapper } from '@chillui/ui'

import COLORS from '@/constants/colors.contstants'
import { useSafeArea } from '@/hooks/safe-area.hook'
import GoBackButton from '@/components/ui/navigation/header-go-back/components/go-back-button.component'

import ProfilHeaderNotification from './profil-header-notification.component'

interface ProfilHeaderProps {
  isMe: boolean
}

export default function ProfilHeader(props: ProfilHeaderProps) {
  const { t } = useTranslate()
  const { isMe: isProfilMe } = props

  const { safeTop } = useSafeArea()

  return (
    <Wrapper className='flex-row items-center z-10 pb-2' style={{ paddingTop: safeTop }}>
      <BoxRowGrow className='items-center gap-3'>
        {!isProfilMe && <GoBackButton />}
        <Box className={cn({ 'mt-2': !isProfilMe })}>
          <OutlinedString
            text={isProfilMe ? t('profil.me_header_title') : t('profil.user_header_title')}
            fontSize={32}
            fillColor="#FFFFFF"
            strokeColor={COLORS.primary}
            strokeWidth={2}
            fontFamily="NunitoSans700Bold"
          />
        </Box>
      </BoxRowGrow>
      {
        isProfilMe && (
          <BoxRow className='items-center gap-2'>
            <ProfilHeaderNotification />
            <Link href="/settings" asChild>
              <IconButton iconName='setting-gear-regular' colorVariant="white" iconColor={COLORS.primary} as="scale-pressable" />
            </Link>
          </BoxRow>
        )
      }

    </Wrapper >
  )
}