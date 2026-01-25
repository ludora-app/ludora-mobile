import { String } from '@components/nysaUi';
import { formatSecondsToMinutes } from '@utils/time';

import { useChatRoomInputAudioTimerStore } from '../../../store/chatRoomInputAudioStore';

export default function ChatRoomInputAudioRecorderTimer() {
  const { audioTimer } = useChatRoomInputAudioTimerStore();
  return <String>{formatSecondsToMinutes(audioTimer)}</String>;
}
