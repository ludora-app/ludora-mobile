import { StyleSheet } from 'react-native'
import { useTranslate } from '@tolgee/react'
import { memo, PropsWithChildren, ReactElement } from 'react'
import {
  Box,
  SegmentedControl as ChillSegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlTrigger,
  SegmentedControlTriggerContent,
} from '@chillui/ui'

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)',
  },
})

export interface SegmentedControlItem<T> {
  readonly value: T
  readonly option?: string
  readonly labelKey: string
}

interface SegmentedControlProps<T> {
  readonly onValueChange: (value: T) => void
  readonly items: readonly SegmentedControlItem<T>[]
}

function SegmentedControlImpl<T extends string>(props: PropsWithChildren<SegmentedControlProps<T>>) {
  const { children, items, onValueChange } = props
  const { t } = useTranslate()

  return (
    <Box className='gap-3'>
      <ChillSegmentedControl>
        <SegmentedControlTriggerContent className='h-12'>
          {items.map((item) => (
            <SegmentedControlTrigger
              key={item.option || item.value}
              value={item.option || item.value.toLowerCase()}
              stringProps={{
                activeColor: "black",
                className: "text-muted",
                font: "primaryBold"
              }}
              onPress={() => onValueChange(item.value)}
            >
              {t(item.labelKey)}
            </SegmentedControlTrigger>
          ))}
        </SegmentedControlTriggerContent>
        <SegmentedControlIndicator className='bg-white' style={styles.shadow} />
      </ChillSegmentedControl>
      {children && children}
    </Box>
  )
}

type SegmentedControlComponent = <T extends string>(props: PropsWithChildren<SegmentedControlProps<T>>) => ReactElement

export const SegmentedControl = memo(SegmentedControlImpl) as unknown as SegmentedControlComponent
