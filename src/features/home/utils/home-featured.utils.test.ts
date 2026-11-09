/// <reference types="bun" />
import { it, expect, describe } from 'bun:test';

import { getHasBubble, getHomeFeaturedState } from './home-featured.utils';

const known = {
  dismissedCount: 0,
  hasNextMatch: false,
  hasSessionsAround: true,
  hasSportPreferences: true,
  isFirstSessionPending: true,
  suggestionsCount: 2,
};

describe('getHomeFeaturedState', () => {
  it('should wait for the next match before anything else', () => {
    expect(getHomeFeaturedState({ ...known, hasNextMatch: undefined })).toEqual({ type: 'loading' });
  });

  it('should feature the next match whatever the recommendations', () => {
    expect(getHomeFeaturedState({ ...known, hasNextMatch: true, hasSportPreferences: undefined })).toEqual({
      type: 'next-match',
    });
  });

  it('should feature nothing on an empty profile', () => {
    expect(getHomeFeaturedState({ ...known, hasSportPreferences: false, suggestionsCount: undefined })).toEqual({
      type: 'empty-profile',
    });
  });

  it('should feature nothing once a session was joined or created and none is upcoming', () => {
    expect(getHomeFeaturedState({ ...known, isFirstSessionPending: false })).toEqual({ type: 'idle' });
  });

  it('should feature the matching session first', () => {
    expect(getHomeFeaturedState(known)).toEqual({ isFirstSuggestion: true, type: 'match' });
  });

  it('should feature the next suggestion after "Pas pour moi"', () => {
    expect(getHomeFeaturedState({ ...known, dismissedCount: 1, suggestionsCount: 1 })).toEqual({
      isFirstSuggestion: false,
      type: 'match',
    });
  });

  it('should feature the prepared session once every suggestion was passed', () => {
    expect(
      getHomeFeaturedState({ ...known, dismissedCount: 2, hasSessionsAround: undefined, suggestionsCount: 0 }),
    ).toEqual({ reason: 'passed', type: 'prepared' });
  });

  it('should feature the prepared session when nothing matches', () => {
    expect(getHomeFeaturedState({ ...known, suggestionsCount: 0 })).toEqual({ reason: 'no-match', type: 'prepared' });
  });

  it('should feature the prepared session as the first one around', () => {
    expect(getHomeFeaturedState({ ...known, hasSessionsAround: false, suggestionsCount: 0 })).toEqual({
      reason: 'none-around',
      type: 'prepared',
    });
  });

  it('should wait for the sessions around before choosing the prepared reason', () => {
    expect(getHomeFeaturedState({ ...known, hasSessionsAround: undefined, suggestionsCount: 0 })).toEqual({
      type: 'loading',
    });
  });
});

describe('getHasBubble', () => {
  it('should show the bubble on the first visit with the matching session', () => {
    expect(getHasBubble({ isFirstVisit: true, state: { isFirstSuggestion: true, type: 'match' } })).toBe(true);
  });

  it('should hide the bubble after "Pas pour moi"', () => {
    expect(getHasBubble({ isFirstVisit: true, state: { isFirstSuggestion: false, type: 'match' } })).toBe(false);
    expect(getHasBubble({ isFirstVisit: true, state: { reason: 'passed', type: 'prepared' } })).toBe(false);
  });

  it('should show the bubble on the first visit with the prepared session', () => {
    expect(getHasBubble({ isFirstVisit: true, state: { reason: 'none-around', type: 'prepared' } })).toBe(true);
  });

  it('should never show the bubble on an empty profile, the next match or the next visits', () => {
    expect(getHasBubble({ isFirstVisit: true, state: { type: 'empty-profile' } })).toBe(false);
    expect(getHasBubble({ isFirstVisit: true, state: { type: 'next-match' } })).toBe(false);
    expect(getHasBubble({ isFirstVisit: false, state: { isFirstSuggestion: true, type: 'match' } })).toBe(false);
  });
});
