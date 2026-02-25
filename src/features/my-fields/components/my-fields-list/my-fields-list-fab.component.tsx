import type { AnimatedStyle } from 'react-native-reanimated'

import { Icon } from '@ludo/ui'
import Animated from 'react-native-reanimated'
import { Pressable, type StyleProp } from 'react-native'

type MyFieldsListFabProps = {
  onPress: () => void
  animatedStyle: StyleProp<AnimatedStyle<Record<string, unknown>>>
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
