import { ScrollViewProps } from 'react-native';
import { ComponentRef, forwardRef } from 'react';
import { KeyboardChatScrollView, KeyboardChatScrollViewProps } from 'react-native-keyboard-controller';


type Ref = ComponentRef<typeof KeyboardChatScrollView>;

const VirtualizedListScrollView = forwardRef<Ref, ScrollViewProps & KeyboardChatScrollViewProps>(
  (props, ref) => (
    <KeyboardChatScrollView
      ref={ref}
      automaticallyAdjustContentInsets={false}
      contentInsetAdjustmentBehavior="never"
      {...props}
    />
  ),
);

VirtualizedListScrollView.displayName = 'VirtualizedListScrollView';

export default VirtualizedListScrollView;
