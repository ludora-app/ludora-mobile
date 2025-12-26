import { create } from 'zustand';
import { CreateSessionFromRequestDto } from '@api/generated/model/createSessionFromRequestDto';

import { SessionsFindAllSportsItem } from '@/api/generated/model';

type SessionProps = CreateSessionFromRequestDto & { sport: SessionsFindAllSportsItem };

interface CreateSessionStore {
  session: SessionProps;
  setSession: (session: Partial<SessionProps>) => void;
}

export const createSessionStore = create<CreateSessionStore>((set, get) => ({
  session: null,
  setSession: session => set({ session: { ...get().session, ...session } }),
}));
