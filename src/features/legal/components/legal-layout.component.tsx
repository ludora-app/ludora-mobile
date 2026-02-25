import { PropsWithChildren } from 'react'
import { ScrollView } from 'react-native'
import { Box, ScreenLayout, String, Wrapper } from '@ludo/ui'

import { useSafeArea } from '@/hooks/safe-area.hook'
import HeaderGoBack from '@/components/ui/navigation/header-go-back/components/header-go-back.component'

import LegalFooter from './legal-footer.component'

type LegalLayoutProps = PropsWithChildren<{
  title: string
  subtitle?: string
}>

export default function LegalLayout({ children, subtitle, title }: LegalLayoutProps) {
  const { bottom } = useSafeArea()

  return (
    <ScreenLayout>
      <HeaderGoBack hasTopSafeArea title={title} titleProps={{ variant: "body-2" }} />
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
