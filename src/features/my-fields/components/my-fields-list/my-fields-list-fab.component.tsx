import { Icon } from '@ludo/ui'
import { Pressable } from 'react-native'
import Animated from 'react-native-reanimated'

import type { useFabScrollHide } from '@/hooks/use-fab-scroll-hide.hook'

type MyFieldsListFabProps = {
  onPress: () => void
  animatedStyle: ReturnType<typeof useFabScrollHide>['fabAnimatedStyle']
}

export default function MyFieldsListFab(props: MyFieldsListFabProps) {
  const { animatedStyle, onPress } = props

  return (
    <Animated.View style={[animatedStyle]} className="absolute bottom-10 right-5">
      <Pressable
        onPress={onPress}
        className="size-14 items-center justify-center rounded-full bg-primary"
      >
        <Icon name="add-circle-regular" size="lg" color="#FFF" />
      </Pressable>
    </Animated.View>
  )
}
