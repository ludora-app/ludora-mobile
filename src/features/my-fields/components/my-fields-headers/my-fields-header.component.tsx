import { memo } from 'react'
import { Box, } from '@ludo/ui'
import { useTranslate } from '@tolgee/react'
import { cn, OutlinedString, } from '@chillui/ui'

import COLORS from '@/constants/colors.contstants'
import GoBackButton from '@/components/ui/navigation/header-go-back/components/go-back-button.component'

type MyFieldsHeaderProps = {
  titleKey: string
  className?: string
}

function MyFieldsHeader(props: MyFieldsHeaderProps) {
  const { className, titleKey } = props
  const { t } = useTranslate()

  if (!titleKey) {
    return null
  }

  return (
    <Box className={cn('flex-row items-center z-10 gap-2', className)}>
      <GoBackButton />
      <OutlinedString
        text={t(titleKey)}
        fontSize={28}
        fillColor="#FFFFFF"
        strokeColor={COLORS.primary}
        strokeWidth={2}
        fontFamily="NunitoSans700Bold"
        className="mt-2"
      />
    </Box>
  )
}

export default memo(MyFieldsHeader)
