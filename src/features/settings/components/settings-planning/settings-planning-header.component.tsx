import { Wrapper } from '@ludo/ui'
import { OutlinedString } from '@chillui/ui'
import { useTranslate } from '@tolgee/react'

import COLORS from '@/constants/colors.contstants'
import { useSafeArea } from '@/hooks/safe-area.hook'
import GoBackButton from '@/components/ui/navigation/header-go-back/components/go-back-button.component'

export default function SettingsPlanningHeader() {
  const { t } = useTranslate()
  const { top } = useSafeArea()

  return (
    <Wrapper className='flex-row items-center z-10 pb-4 gap-2' style={{ paddingTop: top + 10 }}>
      <GoBackButton />
      <OutlinedString
        text={t('settings.planning.header_title')}
        fontSize={28}
        fillColor="#FFFFFF"
        strokeColor={COLORS.primary}
        strokeWidth={2}
        fontFamily="NunitoSans700Bold"
        className='mt-2'
      />
    </Wrapper>
  )
}
