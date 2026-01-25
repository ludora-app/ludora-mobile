import { Audio } from 'expo-av';
import { create } from 'zustand';

type ChatRoomPlaybackSoundState = {
  activeSoundKey: number | null;
  activeSound: Audio.Sound | null;
  setActiveSound: (sound: Audio.Sound | null) => void;
};

const useChatRoomPlaybackSoundStore = create<ChatRoomPlaybackSoundState>(set => ({
  activeSound: null,
  activeSoundKey: null,
  setActiveSound: sound => {
    set({ activeSound: sound });
    set({ activeSoundKey: sound?._key as number });
  },
}));

export default useChatRoomPlaybackSoundStore;
