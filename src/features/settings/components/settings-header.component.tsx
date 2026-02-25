import { memo } from 'react'
import { useTranslate } from '@tolgee/react'
import { cn, OutlinedString, Wrapper } from '@chillui/ui'

import COLORS from '@/constants/colors.contstants'
import { useSafeArea } from '@/hooks/safe-area.hook'
import GoBackButton from '@/components/ui/navigation/header-go-back/components/go-back-button.component'

type SettingsHeaderProps = {
  titleKey: string
  hasTopSafeArea?: boolean
  hasHorizontalPadding?: boolean
  className?: string
}

function SettingsHeader(props: SettingsHeaderProps) {
  const { className, hasHorizontalPadding, hasTopSafeArea, titleKey } = props
  const { t } = useTranslate()
  const { safeTop } = useSafeArea()

  if (!titleKey) {
    return null
  }


  return (
    <Wrapper px={hasHorizontalPadding ? 'md' : 'none'} className={cn('flex-row items-center z-10 pb-4 gap-2', className)} style={{ paddingTop: hasTopSafeArea ? safeTop : 0 }}>
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

export default memo(SettingsHeader)