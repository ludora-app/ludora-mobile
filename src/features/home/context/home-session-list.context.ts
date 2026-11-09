import { createContext, useContext } from 'react';

type HomeSessionListContextValue = {
  /** Upcoming sessions the player joined or organises: "Tu es inscrit". */
  joinedUids: ReadonlySet<string>;
  /** Sessions recommended to the player: "Pour toi". */
  recommendedUids: ReadonlySet<string>;
};

const EMPTY_UIDS: ReadonlySet<string> = new Set();

export const HomeSessionListContext = createContext<HomeSessionListContextValue>({
  joinedUids: EMPTY_UIDS,
  recommendedUids: EMPTY_UIDS,
});

export const useHomeSessionListContext = () => useContext(HomeSessionListContext);

export type HomeSessionBadge = 'for-you' | 'joined' | null;

/** "Tu es inscrit" wins over "Pour toi". */
export const getHomeSessionBadge = ({
  joinedUids,
  recommendedUids,
  uid,
}: HomeSessionListContextValue & { uid: string }): HomeSessionBadge => {
  if (joinedUids.has(uid)) return 'joined';
  if (recommendedUids.has(uid)) return 'for-you';
  return null;
};
