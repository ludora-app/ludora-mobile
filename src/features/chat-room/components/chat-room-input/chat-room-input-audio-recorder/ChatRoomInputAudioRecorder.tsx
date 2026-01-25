import COLORS from '@constants/COLORS';
import { Box, Icon, String } from '@components/nysaUi';

import ChatRoomInputAudioRecorderTimer from './ChatRoomInputAudioRecorderTimer';
import { useChatRoomInputAudioStore } from '../../../store/chatRoomInputAudioStore';

export default function ChatRoomInputAudioRecorder() {
  const { isRecordingLocked, showTrashIconOnInput } = useChatRoomInputAudioStore();

  return (
    <Box className="h-full bg-darkLight border border-white rounded-lg flex-row justify-between items-center px-2">
      {showTrashIconOnInput ? (
        <Box className="ml-2">
          <Icon variant="trash-solid" color="#ff0000" />
        </Box>
      ) : (
        <Box className="flex-row items-center gap-2">
          <Icon variant="microphone-solid" color={COLORS.primaryColor} />
          <ChatRoomInputAudioRecorderTimer />
        </Box>
      )}

      {/* if recording is locked, show recording indication */}
      {isRecordingLocked && (
        <Box className="overflow-hidden w-4/5 items-end pr-3">
          <String size="2xs">Enregistrement en cours...</String>
        </Box>
      )}
    </Box>
  );
}
