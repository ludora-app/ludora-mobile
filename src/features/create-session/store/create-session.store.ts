import { create } from 'zustand';
import { CreateSessionFromRequestDto } from '@api/generated/model/createSessionFromRequestDto';

import { SessionsFindAllSportsItem } from '@/api/generated/model';

type SessionProps = CreateSessionFromRequestDto & { sport: SessionsFindAllSportsItem };

type Session = Partial<SessionProps> & { day?: string };

interface CreateSessionStore {
  session: Session;

  setSession: (session: Session) => void;
}

export const useCreateSessionStore = create<CreateSessionStore>((set, get) => ({
  session: {
    day: new Date().toISOString(),
  },
  setSession: session => set({ session: { ...get().session, ...session } }),
}));
