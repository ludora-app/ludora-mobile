import type { UseTranslateResult } from '@tolgee/react';

import { createContext, useContext } from 'react';

type PlayersListContextValue = {
  onInvite: (userUid: string) => Promise<void>;
  t: UseTranslateResult['t'];
};

const PlayersListContext = createContext<PlayersListContextValue>(null!);

export const PlayersListProvider = PlayersListContext.Provider;
export const usePlayersListContext = () => useContext(PlayersListContext);
