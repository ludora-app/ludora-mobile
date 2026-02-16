import { useTranslate } from '@tolgee/react'
import { OutlinedString, Wrapper } from '@chillui/ui'

import COLORS from '@/constants/COLORS'
import { useSafeArea } from '@/hooks/safe-area.hook'
import GoBackButton from '@/components/ui/navigation/header-go-back/components/go-back-button.component'

type SettingsHeaderProps = {
  titleKey: string
  hasTopSafeArea?: boolean
  hasHorizontalPadding?: boolean
}

export default function SettingsHeader(props: SettingsHeaderProps) {
  const { hasHorizontalPadding, hasTopSafeArea, titleKey } = props
  const { t } = useTranslate()
  const { top } = useSafeArea()

  if (!titleKey) {
    return null
  }

  return (
    <Wrapper px={hasHorizontalPadding ? 'md' : 'none'} className='flex-row items-center z-10 pb-4 gap-2' style={{ paddingTop: hasTopSafeArea ? top + 10 : 0 }}>
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