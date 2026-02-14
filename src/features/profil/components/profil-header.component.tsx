import { OutlinedString } from '@chillui/ui'
import { BoxRow, IconButton, Link, Wrapper } from '@ludo/ui'

import COLORS from '@/constants/COLORS'
import { useSafeArea } from '@/hooks/safe-area.hook'

export default function ProfilHeader() {
  const { top } = useSafeArea()

  return (
    <Wrapper className='flex-row justify-between items-center z-10 pb-2' style={{ paddingTop: top + 20 }}>
      <OutlinedString
        text='Mon profil'
        fontSize={32}
        fillColor="#FFFFFF"
        strokeColor={COLORS.primary}
        strokeWidth={2}
        fontFamily="NunitoSans700Bold"
      />
      <BoxRow className='items-center gap-2'>
        <Link href="/profil/profil-edit" asChild>
          <IconButton iconName='e-pen-regular' colorVariant="white" iconColor={COLORS.primary} as="scale-pressable" />
        </Link>
        <Link href="/settings" asChild>
          <IconButton iconName='setting-gear-regular' colorVariant="white" iconColor={COLORS.primary} as="scale-pressable" />
        </Link>
        <Link href="/notifications" asChild>
          <IconButton iconName='bell-regular' colorVariant="white" iconColor={COLORS.primary} as="scale-pressable" />
        </Link>
      </BoxRow>

    </Wrapper>
  )
}