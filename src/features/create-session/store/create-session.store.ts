import { create } from 'zustand';
import { CreateSessionFromRequestDto } from '@api/generated/model/createSessionFromRequestDto';

import { SessionCollectionItemSport } from '@/api/generated/model';

type SessionProps = CreateSessionFromRequestDto & {
  additionalData: {
    price?: number;
    pricePerPlayer?: number;
    publicFieldSlotUid?: string;
    sport?: SessionCollectionItemSport;
    fieldType?: 'partner' | 'public';
    createdSessionUid?: string;
  };
};

export type Session = Partial<SessionProps>;

interface CreateSessionStore {
  session: Session;
  reset: () => void;
  setSession: (session: Session) => void;
}

export const useCreateSessionStore = create<CreateSessionStore>((set, get) => ({
  reset: () => set({ session: { visibility: 'PUBLIC' } }),
  session: {
    visibility: 'PUBLIC',
  },
  setSession: session =>
    set({
      session: {
        ...get().session,
        ...session,
        additionalData: { ...get().session.additionalData, ...session.additionalData },
      },
    }),
}));
