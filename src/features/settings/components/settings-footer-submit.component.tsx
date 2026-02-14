import { memo } from 'react'
import { Button } from '@ludo/ui'
import { useTranslate } from '@tolgee/react'
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated'

import { FooterWrapper } from '@/components/ui/footer-wrapper'

type SettingsFooterSubmitProps = {
  isDirty: boolean
  onPress: () => void
  isLoading?: boolean
}

function SettingsFooterSubmit(props: SettingsFooterSubmitProps) {
  const { isDirty, isLoading, onPress } = props
  const { t } = useTranslate()

  return (
    isDirty && (
      <Animated.View
        entering={SlideInDown.duration(500)}
        exiting={SlideOutDown.duration(200)}
        className="absolute bottom-0 left-0 right-0"
      >
        <FooterWrapper hasBottomSafeArea>
          <Button
            title={t('common.apply')}
            onPress={onPress}
            isLoading={isLoading}
          />
        </FooterWrapper>
      </Animated.View>
    )
  )
}

export default memo(SettingsFooterSubmit, (prevProps, nextProps) => prevProps.isDirty === nextProps.isDirty && prevProps.isLoading === nextProps.isLoading)