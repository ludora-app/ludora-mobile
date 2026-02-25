import { Box } from '@ludo/ui'
import { useTranslate } from '@tolgee/react'
import { cn, OutlinedString, Wrapper, } from '@chillui/ui'

import COLORS from '@/constants/colors.contstants'
import { useSafeArea } from '@/hooks/safe-area.hook'
import GoBackButton from '@/components/ui/navigation/header-go-back/components/go-back-button.component'

type LegalHeaderComponentProps = {
  titleKey: string
  className?: string
}

export default function LegalHeaderComponent(props: LegalHeaderComponentProps) {
  const { safeTop } = useSafeArea()
  const { t } = useTranslate()
  const { className, titleKey } = props

  if (!titleKey) {
    return null
  }

  return (
    <Box className={cn('flex-row items-center z-10 gap-2 pb-4', className)} style={{ paddingTop: safeTop }}>
      <Wrapper className='flex-row items-center z-10 gap-2'>
        <GoBackButton />
        <OutlinedString
          text={t(titleKey)}
          fontSize={18}
          fillColor="#FFFFFF"
          strokeColor={COLORS.primary}
          strokeWidth={2}
          fontFamily="NunitoSans700Bold"
          className="mt-2"
        />
      </Wrapper>
    </Box>
  )
}