import { create } from 'zustand';

import { FieldResponseDto } from '@/api/generated/model';
import { PreparedSessionValues } from '@/utils/prepared-session.utils';

type PendingSlot = {
  field: FieldResponseDto;
  startDate: Date;
};

type OnBoardingSessionsState = {
  invitedUserUids: string[];
  /** Field and start time tapped in "Choisir un terrain", waiting for a duration. */
  pendingSlot: PendingSlot | null;
  preparedSession: PreparedSessionValues | null;
  publishedSessionUid: string | null;
  reset: () => void;
  /** Field chosen by the player, instead of the nearest one. */
  selectedField: FieldResponseDto | null;
  setPendingSlot: (pendingSlot: PendingSlot | null) => void;
  setPreparedSession: (preparedSession: PreparedSessionValues | null) => void;
  setPublishedSessionUid: (publishedSessionUid: string) => void;
  setSelectedField: (selectedField: FieldResponseDto) => void;
  toggleInvitedUserUid: (userUid: string) => void;
};

export const useOnBoardingSessionsStore = create<OnBoardingSessionsState>()(set => ({
  invitedUserUids: [],
  pendingSlot: null,
  preparedSession: null,
  publishedSessionUid: null,
  reset: () =>
    set({
      invitedUserUids: [],
      pendingSlot: null,
      preparedSession: null,
      publishedSessionUid: null,
      selectedField: null,
    }),
  selectedField: null,
  setPendingSlot: pendingSlot => set({ pendingSlot }),
  setPreparedSession: preparedSession => set({ preparedSession }),
  setPublishedSessionUid: publishedSessionUid => set({ publishedSessionUid }),
  setSelectedField: selectedField => set({ selectedField }),
  toggleInvitedUserUid: userUid =>
    set(state => ({
      invitedUserUids: state.invitedUserUids.includes(userUid)
        ? state.invitedUserUids.filter(uid => uid !== userUid)
        : [...state.invitedUserUids, userUid],
    })),
}));
