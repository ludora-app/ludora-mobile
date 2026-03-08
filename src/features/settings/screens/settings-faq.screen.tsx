import { StyleSheet } from 'react-native'
import { useTranslate } from '@tolgee/react'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger, Box,
  ScreenLayout, ScrollView, String, Wrapper,
  Icon
} from '@ludo/ui'

import { useSafeArea } from '@/hooks/safe-area.hook'

import SettingsHeader from '../components/settings-header.component'

const FAQ_ITEMS = [
  { answer: 'settings.faq.a1', question: 'settings.faq.q1', value: 'item-1' },
  { answer: 'settings.faq.a2', question: 'settings.faq.q2', value: 'item-2' },
  { answer: 'settings.faq.a3', question: 'settings.faq.q3', value: 'item-3' },
  { answer: 'settings.faq.a4', question: 'settings.faq.q4', value: 'item-4' },
  { answer: 'settings.faq.a5', question: 'settings.faq.q5', value: 'item-5' },
  { answer: 'settings.faq.a6', question: 'settings.faq.q6', value: 'item-6' },
  { answer: 'settings.faq.a7', question: 'settings.faq.q7', value: 'item-7' },
]

const styles = StyleSheet.create({
  shadowPrimary: {
    boxShadow: '0px 0px 2px #F1450040',
  },
});

export default function SettingsFaqScreen() {
  const { t } = useTranslate()
  const { bottom } = useSafeArea()

  return (
    <ScreenLayout>
      <ScrollView bounces={false}>
        <SettingsHeader
          titleKey="settings.faq.header_title"
          hasTopSafeArea
          hasHorizontalPadding
          outlinedStringWidth={80}
        />
        <Wrapper
          fill
          className="bg-background rounded-t-xl z-50 pt-8 px-5 gap-8"
          style={{ paddingBottom: bottom + 40 }}
        >
          <Box className="gap-2 items-center justify-center">
            <Icon name="ludo-idea-2" className='size-24 self-center' />
            <String variant="body-2" colorVariant="muted" className="leading-6">
              {t('settings.faq.description')}
            </String>
          </Box>

          <Accordion
            type="single"
            collapsible
            expandIcon="arrow-down-regular"
            collapseIcon="arrow-down-regular"
            className="gap-4"
          >
            {FAQ_ITEMS.map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="rounded-lg border border-primary/10 overflow-hidden"
                style={styles.shadowPrimary}
              >
                <AccordionTrigger className="px-4 py-4 bg-white" as="ripple-pressable">
                  <String variant="body-1" className="font-primary_bold_font flex-1">
                    {t(item.question)}
                  </String>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-primary/5">
                  <String className="leading-5">
                    {t(item.answer)}
                  </String>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Wrapper>
      </ScrollView>
    </ScreenLayout>
  )
}
