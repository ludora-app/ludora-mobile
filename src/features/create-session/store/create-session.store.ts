import { create } from 'zustand';
import { CreateSessionFromRequestDto } from '@api/generated/model/createSessionFromRequestDto';

type SessionProps = CreateSessionFromRequestDto & {
  additionalData: {
    price?: number;
    pricePerPlayer?: number;
    publicFieldSlotUid?: string;
    fieldType?: 'partner' | 'public';
    autoGoToNextStep?: boolean;
    titleSource?: 'user' | 'suggestion' | 'none';
  };
};

export type Session = Partial<SessionProps>;

interface CreateSessionStore {
  session: Session;
  reset: () => void;
  isStep3Valid: boolean;
  createdSessionUid: string | null;
  setSession: (session: Session) => void;
  setIsStep3Valid: (isStep3Valid: boolean) => void;
  setCreatedSessionUid: (createdSessionUid: string) => void;
}

export const useCreateSessionStore = create<CreateSessionStore>((set, get) => ({
  createdSessionUid: null,
  isStep3Valid: false,
  reset: () => set({ isStep3Valid: false, session: { visibility: 'PUBLIC' } }),
  session: {
    visibility: 'PUBLIC',
  },
  setCreatedSessionUid: createdSessionUid => set({ createdSessionUid }),
  setIsStep3Valid: isStep3Valid => set({ isStep3Valid }),
  setSession: session => {
    const clean = <T extends object>(obj: T): T =>
      Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== '' && v !== null && v !== undefined)) as T;

    set(state => {
      const newAdditionalData = clean({
        ...state.session.additionalData,
        ...session.additionalData,
      });

      const mergedSession = clean({
        ...state.session,
        ...session,
        additionalData: newAdditionalData,
      });

      return { session: mergedSession };
    });
  },
}));
