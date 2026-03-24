import { create } from 'zustand';

type CreateSessionLayoutStore = {
  /** Hauteur du footer sous le Stack (KeyboardToolbar offset). */
  footerHeight: number;
  setFooterHeight: (height: number) => void;
};

export const useCreateSessionLayoutStore = create<CreateSessionLayoutStore>(set => ({
  footerHeight: 0,
  setFooterHeight: height => set({ footerHeight: height }),
}));
