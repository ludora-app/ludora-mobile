import { create } from 'zustand';

interface ChatRoomFullScreenImageModalState {
  isOpen: boolean;
  imagePath: string;
  setIsOpen: (isOpen: boolean) => void;
  setImagePath: (imagePath: string) => void;
}

const useChatRoomFullScreenImageModalStore = create<ChatRoomFullScreenImageModalState>(set => ({
  imagePath: '',
  isOpen: false,
  setImagePath: imagePath => set({ imagePath }),
  setIsOpen: isOpen => set({ isOpen }),
}));

export default useChatRoomFullScreenImageModalStore;
