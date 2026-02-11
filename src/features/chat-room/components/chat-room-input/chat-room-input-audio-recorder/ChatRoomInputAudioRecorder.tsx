import { Box, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/COLORS';

import ChatRoomInputAudioRecorderTimer from './ChatRoomInputAudioRecorderTimer';
import { useChatRoomInputAudioStore } from '../../../store/chatRoomInputAudioStore';

export default function ChatRoomInputAudioRecorder() {
  const { isRecordingLocked, showTrashIconOnInput } = useChatRoomInputAudioStore();

  return (
    <Box className="bg-darkLight h-full flex-row items-center justify-between rounded-lg border border-white px-2">
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
        <Box className="w-4/5 items-end overflow-hidden pr-3">
          <String size="2xs">Enregistrement en cours...</String>
        </Box>
      )}
    </Box>
  );
}
