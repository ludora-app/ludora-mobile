import { useTranslate } from '@tolgee/react'
import { Box, BoxRowGrow, cn, OutlinedString, Wrapper } from '@chillui/ui'

import COLORS from '@/constants/colors.contstants'
import { useSafeArea } from '@/hooks/safe-area.hook'
import GoBackButton from '@/components/ui/navigation/header-go-back/components/go-back-button.component'

import ProfilHeaderActions from './profil-header-actions.component'
import ProfilHeaderActionsMe from './profil-header-actions-me.component'

interface ProfilHeaderProps {
  isMe: boolean
  lastname: string
  firstname: string
}

export default function ProfilHeader(props: ProfilHeaderProps) {
  const { t } = useTranslate()
  const { firstname, isMe: isProfilMe, lastname } = props

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
      <ProfilHeaderActionsMe isMe={isProfilMe} />
      <ProfilHeaderActions isMe={isProfilMe} firstname={firstname} lastname={lastname} />
    </Wrapper >
  )
}