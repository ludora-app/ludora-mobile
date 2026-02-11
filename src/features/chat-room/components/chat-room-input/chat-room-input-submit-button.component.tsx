import { Icon } from '@ludo/ui';
import { cn, ScalePressable } from '@chillui/ui';

type ChatRoomInputSubmitButtonProps = {
  onPress: () => void;
  isDisabled: boolean;
};

export default function ChatRoomInputSubmitButton(props: ChatRoomInputSubmitButtonProps) {
  const { isDisabled, onPress } = props;
  return (
    <ScalePressable
      className={cn('bg-primary size-12 items-center justify-center rounded-full', {
        'opacity-50': isDisabled,
      })}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Icon name="send-2-solid" />
    </ScalePressable>
  );
}
