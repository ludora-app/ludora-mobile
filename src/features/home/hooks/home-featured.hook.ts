import { useMemo } from 'react';

import { HOME_MAX_SUGGESTIONS } from '../constants/home.constants';
import { getHomeFeaturedState } from '../utils/home-featured.utils';
import { useHomeFeaturedStore } from '../stores/home-featured.store';
import { useGetMyPreferences } from '../queries/get-my-preferences.query';
import { useGetHasSessionsAround } from '../queries/get-has-sessions-around.query';
import { useGetMyUpcomingSessions } from '../queries/get-my-upcoming-sessions.query';
import { useGetIsFirstSessionPending } from '../queries/get-is-first-session-pending.query';
import { useGetHomeRecommendedSessions } from '../queries/get-home-recommended-sessions.query';

const NO_UIDS: ReadonlySet<string> = new Set();

/**
 * Everything the home screen needs to choose its featured card (decision A2), and the uids behind the list badges.
 */
export const useGetHomeFeatured = () => {
  const dismissedSessionUids = useHomeFeaturedStore(state => state.dismissedSessionUids);
  const joinedSessionUid = useHomeFeaturedStore(state => state.joinedSessionUid);
  const setJoinedSessionUid = useHomeFeaturedStore(state => state.setJoinedSessionUid);
  const {
    isFetching: isFetchingUpcoming,
    isLoading: isLoadingUpcoming,
    joinedUids,
    nextMatch,
    refetch: refetchUpcoming,
  } = useGetMyUpcomingSessions();
  const {
    hasSportPreferences,
    isSettled: arePreferencesSettled,
    refetch: refetchPreferences,
  } = useGetMyPreferences();
  const {
    isFirstSessionPending,
    isLoading: isLoadingStats,
    refetch: refetchStats,
  } = useGetIsFirstSessionPending();
  const {
    isSettled: isRecommendedSettled,
    recommendedSessions,
    recommendedUids,
    refetch: refetchRecommended,
  } = useGetHomeRecommendedSessions({ isEnabled: hasSportPreferences });

  // At most 3 suggestions in a row, whatever the number of recommended sessions
  const suggestions = useMemo(
    () => recommendedSessions.slice(0, HOME_MAX_SUGGESTIONS).filter(({ uid }) => !dismissedSessionUids.includes(uid)),
    [dismissedSessionUids, recommendedSessions],
  );

  const isWaitingForPrepared =
    !nextMatch && hasSportPreferences && isFirstSessionPending && isRecommendedSettled && suggestions.length === 0;
  const { hasSessionsAround } = useGetHasSessionsAround({ isEnabled: isWaitingForPrepared });

  // Joined from the featured card, and the player's sessions are being fetched again: the recommendations may come
  // back first, and the next suggestion must not take the card (a second tap on "Rejoindre" would join it)
  const isWaitingForJoined = !!joinedSessionUid && !joinedUids.has(joinedSessionUid) && isFetchingUpcoming;

  const state = getHomeFeaturedState({
    dismissedCount: dismissedSessionUids.length,
    hasNextMatch: isLoadingUpcoming || isWaitingForJoined ? undefined : !!nextMatch,
    hasSessionsAround,
    hasSportPreferences: arePreferencesSettled ? hasSportPreferences : undefined,
    isFirstSessionPending: isLoadingStats ? undefined : isFirstSessionPending,
    suggestionsCount: isRecommendedSettled ? suggestions.length : undefined,
  });

  // The preferences too: a failed query would otherwise stay "no preference" until the next opening
  const refetch = () => {
    // Once the joined session is left, refreshing must not wait for it
    setJoinedSessionUid(null);
    return Promise.all([
      refetchUpcoming(),
      refetchStats(),
      refetchPreferences(),
      ...(hasSportPreferences ? [refetchRecommended()] : []),
    ]);
  };

  return {
    joinedUids,
    nextMatch,
    // Never "Pour toi" on an empty profile, even from recommendations still in the cache
    recommendedUids: hasSportPreferences ? recommendedUids : NO_UIDS,
    refetch,
    state,
    suggestion: suggestions[0] ?? null,
  };
};
