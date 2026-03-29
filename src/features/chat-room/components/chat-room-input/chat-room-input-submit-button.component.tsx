import { Icon } from '@ludo/ui';
import { StyleSheet } from 'react-native';
import { ScalePressable } from '@chillui/ui';

import COLORS from '@/constants/colors.contstants';

import { useChatRoomSessionTeam } from '../../utils/chat-room-session-team.utils';

type ChatRoomInputSubmitButtonProps = {
  onPress: () => void;
  isDisabled: boolean;
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
});

export default function ChatRoomInputSubmitButton(props: ChatRoomInputSubmitButtonProps) {
  const { isDisabled, onPress } = props;
  const { backgroundColor } = useChatRoomSessionTeam();

  return (
    <ScalePressable
      style={[styles.button, isDisabled && { opacity: 0.5 }, backgroundColor]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Icon name="send-2-solid" />
    </ScalePressable>
  );
}
