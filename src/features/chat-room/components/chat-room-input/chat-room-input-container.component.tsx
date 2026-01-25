import { Box } from '@components/nysaUi';

import ChatRoomInput from './chat-room-input.component';
import useKeyboardVisible from '../../hooks/useKeyboardVisible';
import useChatRoomInputStore from '../../store/chatRoomInputStore';
import { useChatRoomInputAudioStore } from '../../store/chatRoomInputAudioStore';
import ChatRoomInputAudioRecorder from './chat-room-input-audio-recorder/ChatRoomInputAudioRecorder';
import ChatRoomInputAudioRecorderButton from './chat-room-input-audio-recorder/ChatRoomInputAudioRecorderButton';

export default function ChatRoomInputContainer() {
  const { isRecording } = useChatRoomInputAudioStore();
  const { isInputValueEmpty } = useChatRoomInputStore();
  const isKeyboardVisible = useKeyboardVisible();

  return (
    <Box className="px-4">
      <Box className="flex-row items-center gap-2">
        <Box className="h-fit flex-1">
          <ChatRoomInput />
          {/* show audio recorder if recording */}
          {isRecording && (
            <Box className="absolute left-0 right-0 top-0 h-full flex-1 bg-main">
              <ChatRoomInputAudioRecorder />
            </Box>
          )}
        </Box>

        {/* show record button if input is empty */}
        {isInputValueEmpty && !isKeyboardVisible && (
          <Box className="size-14">
            <ChatRoomInputAudioRecorderButton />
          </Box>
        )}
      </Box>
    </Box>
  );
}
