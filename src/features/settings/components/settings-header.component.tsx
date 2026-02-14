import { Wrapper } from '@ludo/ui'
import { OutlinedString } from '@chillui/ui'
import { useTranslate } from '@tolgee/react'

import COLORS from '@/constants/COLORS'
import { useSafeArea } from '@/hooks/safe-area.hook'
import GoBackButton from '@/components/ui/navigation/header-go-back/components/go-back-button.component'

type SettingsHeaderProps = {
  titleKey: string
}

export default function SettingsHeader(props: SettingsHeaderProps) {
  const { titleKey } = props
  const { t } = useTranslate()
  const { top } = useSafeArea()

  if (!titleKey) {
    return null
  }

  return (
    <Wrapper className='flex-row items-center z-10 pb-4 gap-2' style={{ paddingTop: top + 10 }}>
      <GoBackButton />
      <OutlinedString
        text={t(titleKey)}
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