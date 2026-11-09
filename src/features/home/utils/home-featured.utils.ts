export type HomePreparedReason = 'no-match' | 'none-around' | 'passed';

export type HomeFeaturedState =
  | { type: 'empty-profile' }
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'match'; isFirstSuggestion: boolean }
  | { type: 'next-match' }
  | { type: 'prepared'; reason: HomePreparedReason };

/**
 * Which card the home header features (decision A2), from what is known so far.
 * A value still loading is `undefined`: the state stays `loading` until the first decisive value is known.
 */
export const getHomeFeaturedState = ({
  dismissedCount,
  hasNextMatch,
  hasSessionsAround,
  hasSportPreferences,
  isFirstSessionPending,
  suggestionsCount,
}: {
  dismissedCount: number;
  hasNextMatch: boolean | undefined;
  hasSessionsAround: boolean | undefined;
  hasSportPreferences: boolean | undefined;
  isFirstSessionPending: boolean | undefined;
  suggestionsCount: number | undefined;
}): HomeFeaturedState => {
  if (hasNextMatch === undefined) return { type: 'loading' };
  if (hasNextMatch) return { type: 'next-match' };

  if (hasSportPreferences === undefined) return { type: 'loading' };
  if (!hasSportPreferences) return { type: 'empty-profile' };

  if (isFirstSessionPending === undefined) return { type: 'loading' };
  if (!isFirstSessionPending) return { type: 'idle' };

  if (suggestionsCount === undefined) return { type: 'loading' };
  if (suggestionsCount > 0) return { isFirstSuggestion: dismissedCount === 0, type: 'match' };
  if (dismissedCount > 0) return { reason: 'passed', type: 'prepared' };

  if (hasSessionsAround === undefined) return { type: 'loading' };
  return { reason: hasSessionsAround ? 'no-match' : 'none-around', type: 'prepared' };
};

/** Ludo's bubble: first visit only, on the matching or prepared session, until "Pas pour moi". */
export const getHasBubble = ({ isFirstVisit, state }: { isFirstVisit: boolean; state: HomeFeaturedState }) => {
  if (!isFirstVisit) return false;
  if (state.type === 'match') return state.isFirstSuggestion;
  return state.type === 'prepared' && state.reason !== 'passed';
};
