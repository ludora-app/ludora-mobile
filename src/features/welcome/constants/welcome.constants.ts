import { SessionCollectionItemDtoSport } from '@/api/generated/model';

// Static teaser shown before sign-up: the visitor is not authenticated, so no real sessions can be fetched
export const WELCOME_PREVIEW_MATCHES = [
  {
    id: 'football',
    isFaded: false,
    placeKey: 'welcome.preview_match_football_place',
    sport: SessionCollectionItemDtoSport.FOOTBALL,
    spots: '7/10',
    titleKey: 'welcome.preview_match_football_title',
  },
  {
    id: 'padel',
    isFaded: false,
    placeKey: 'welcome.preview_match_padel_place',
    sport: SessionCollectionItemDtoSport.PADEL,
    spots: '3/4',
    titleKey: 'welcome.preview_match_padel_title',
  },
  {
    id: 'basketball',
    isFaded: true,
    placeKey: 'welcome.preview_match_basketball_place',
    sport: SessionCollectionItemDtoSport.BASKETBALL,
    spots: '6/10',
    titleKey: 'welcome.preview_match_basketball_title',
  },
] as const;

export type WelcomePreviewMatch = (typeof WELCOME_PREVIEW_MATCHES)[number];
