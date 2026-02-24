import { create } from 'zustand';
import { CreateSessionFromRequestDto } from '@api/generated/model/createSessionFromRequestDto';

type SessionProps = CreateSessionFromRequestDto & {
  additionalData: {
    price?: number;
    pricePerPlayer?: number;
    publicFieldSlotUid?: string;
    fieldType?: 'partner' | 'public';
    autoGoToNextStep?: boolean;
  };
};

export type Session = Partial<SessionProps>;

interface CreateSessionStore {
  session: Session;
  reset: () => void;
  createdSessionUid: string | null;
  setSession: (session: Session) => void;
  setCreatedSessionUid: (createdSessionUid: string) => void;
}

export const useCreateSessionStore = create<CreateSessionStore>((set, get) => ({
  createdSessionUid: null,
  reset: () => set({ session: { visibility: 'PUBLIC' } }),
  session: {
    visibility: 'PUBLIC',
  },
  setCreatedSessionUid: createdSessionUid => set({ createdSessionUid }),
  setSession: session =>
    set({
      session: {
        ...get().session,
        ...session,
        additionalData: { ...get().session.additionalData, ...session.additionalData },
      },
    }),
}));
