import { PropsWithChildren } from 'react'
import { ScrollView } from 'react-native'
import { Box, ScreenLayout, String, Wrapper } from '@ludo/ui'

import { useSafeArea } from '@/hooks/safe-area.hook'

import LegalFooter from './legal-footer.component'
import LegalHeaderComponent from './legal-header.component'

type LegalLayoutProps = PropsWithChildren<{
  title: string
  subtitle?: string
}>

export default function LegalLayout({ children, subtitle, title }: LegalLayoutProps) {
  const { bottom } = useSafeArea()

  return (
    <ScreenLayout>
      <LegalHeaderComponent titleKey={title} />
      <ScrollView>
        <Wrapper fill className="bg-background rounded-t-xl z-50 pt-6 gap-6" style={{ paddingBottom: bottom + 40 }}>
          <Box className="items-center gap-1">
            <String font="primaryBold" variant="body-1">{title}</String>
            {subtitle && <String variant="body-sm" className="text-muted">{subtitle}</String>}
          </Box>
          {children}
          <LegalFooter />
        </Wrapper>
      </ScrollView>
    </ScreenLayout>
  )
}
