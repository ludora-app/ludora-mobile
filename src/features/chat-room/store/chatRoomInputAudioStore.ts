import { create } from 'zustand';

interface ChatRoomInputAudioState {
  isRecording: boolean;
  isRecordingLocked: boolean;
  showTrashIconOnInput: boolean;
  clearChatRoomInputAudioStore: () => void;
  setIsRecording: (isRecording: boolean) => void;
  setRecordingLocked: (isRecordingLocked: boolean) => void;
  setShowTrashIconOnInput: (showTrashIconOnInput: boolean) => void;
}

interface ChatRoomInputAudioTimerState {
  audioTimer: number;
  setAudioTimer: (audioTimer: number) => void;
}

const useChatRoomInputAudioStore = create<ChatRoomInputAudioState>(set => ({
  clearChatRoomInputAudioStore: () =>
    set({
      isRecording: false,
      isRecordingLocked: false,
      showTrashIconOnInput: false,
    }),
  isRecording: false,
  isRecordingLocked: false,
  setIsRecording: isRecording => set({ isRecording }),
  setRecordingLocked: isRecordingLocked => set({ isRecordingLocked }),
  setShowTrashIconOnInput: showTrashIconOnInput => set({ showTrashIconOnInput }),
  showTrashIconOnInput: false,
}));

const useChatRoomInputAudioTimerStore = create<ChatRoomInputAudioTimerState>(set => ({
  audioTimer: 0,
  setAudioTimer: audioTimer => set({ audioTimer }),
}));

export { useChatRoomInputAudioStore, useChatRoomInputAudioTimerStore };
