import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type KeyboardHeightState = {
  keyboardHeight: number | null;
  setKeyboardHeight: (data: number) => void;
  clearKeyboardHeight: () => void;
};

const useChatRoomKeyboardHeightStore = create<KeyboardHeightState>()(
  persist(
    set => ({
      clearKeyboardHeight: () => set({ keyboardHeight: 0 }),
      keyboardHeight: null,
      setKeyboardHeight: data => set({ keyboardHeight: data }),
    }),
    {
      name: 'chatRoomKeyboardHeightStore',
      partialize: state => ({
        keyboardHeight: state.keyboardHeight,
      }),
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useChatRoomKeyboardHeightStore;
