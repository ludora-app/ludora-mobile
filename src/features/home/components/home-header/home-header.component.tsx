import { useEffect, useState } from 'react';
import { useTranslate } from '@tolgee/react';
import { Box, Button, Skeleton, Wrapper } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import { useUserMe } from '@/queries/user-me.query';
import { truncateString } from '@/utils/string.utils';
import { SessionCollectionItemDto } from '@/api/generated/model';

import { useHomeWelcomeStore } from '../../stores/home-welcome.store';
import { HomeHeaderGreeting } from './home-header-greeting.component';
import { getHasBubble, HomeFeaturedState } from '../../utils/home-featured.utils';
import { HomeFeaturedMatchCard } from '../home-featured/home-featured-match-card.component';
import { HomeFeaturedPreparedCard } from '../home-featured/home-featured-prepared-card.component';
import { HomeFeaturedNextMatchCard } from '../home-featured/home-featured-next-match-card.component';
import { HomeSessionListHeader } from '../home-session-list/home-session-list-header/home-session-list-header.component';

const MAX_USERNAME_LENGTH = 12;

type HomeHeaderProps = {
  nextMatch: SessionCollectionItemDto | null;
  state: HomeFeaturedState;
  suggestion: SessionCollectionItemDto | null;
};

function getSubtitleKey({ isOrganiser, state }: { isOrganiser: boolean; state: HomeFeaturedState }) {
  switch (state.type) {
    case 'next-match':
      return isOrganiser ? 'home.header.sub_title_published' : 'home.header.sub_title_joined';
    case 'match':
      return state.isFirstSuggestion ? 'home.header.sub_title_match' : 'home.header.sub_title_match_next';
    case 'prepared':
      if (state.reason === 'passed') return 'home.header.sub_title_prepared_passed';
      if (state.reason === 'none-around') return 'home.header.sub_title_prepared_none_around';
      return 'home.header.sub_title_prepared';
    default:
      return 'home.header.sub_title_empty';
  }
}

/**
 * The yellow header: greeting, then the one featured card (decision A2), then the cream panel with the list header.
 */
export const HomeHeader = (props: HomeHeaderProps) => {
  const { nextMatch, state, suggestion } = props;
  const { t } = useTranslate();
  const { isLoading: isLoadingUserMe, userMe } = useUserMe();
  const setHasSeenBubble = useHomeWelcomeStore(store => store.setHasSeenBubble);
  // Read once: the bubble stays for the whole first visit, even after the flag is saved
  const [isFirstVisit] = useState(() => !useHomeWelcomeStore.getState().hasSeenBubble);

  const firstname = userMe?.firstname ?? '';
  const isOrganiser = !!userMe?.uid && nextMatch?.creatorUid === userMe.uid;
  const hasBubble = getHasBubble({ isFirstVisit, state });

  useEffect(() => {
    if (hasBubble) setHasSeenBubble();
  }, [hasBubble, setHasSeenBubble]);

  const getBubble = () => {
    if (!hasBubble) return null;
    if (state.type === 'match') {
      return { mascotName: 'ludo-love' as const, text: t('home.bubble.match', { firstname }) };
    }
    const isNoneAround = state.type === 'prepared' && state.reason === 'none-around';
    return {
      mascotName: 'ludo-search' as const,
      text: t(isNoneAround ? 'home.bubble.prepared_none_around' : 'home.bubble.prepared'),
    };
  };

  const renderFeatured = () => {
    switch (state.type) {
      case 'loading':
        return <Skeleton variant="rectangle" className="h-44 w-full rounded-card" />;
      case 'next-match':
        return nextMatch && <HomeFeaturedNextMatchCard session={nextMatch} />;
      case 'match':
        return suggestion && <HomeFeaturedMatchCard session={suggestion} />;
      case 'prepared':
        return <HomeFeaturedPreparedCard />;
      default:
        return (
          <Button
            title={t('home.header.button_create_match')}
            colorVariant="secondary"
            size="lg"
            redirect={ROUTES.CREATE_SESSION.STEP_1}
            iconProps={{ name: 'chill-ui-add-regular', position: 'left' }}
            fit
          />
        );
    }
  };

  return (
    <Box>
      <Box className="bg-tertiary">
        {/* Keeps the yellow above the header when the list bounces at the top (iOS) */}
        <Box className="absolute inset-x-0 -top-250 h-250 bg-tertiary" />
        <Wrapper safeArea={['top']} className="gap-4 pt-4 pb-6">
          <HomeHeaderGreeting
            title={t('home.header.title', {
              username: truncateString({ maxLength: MAX_USERNAME_LENGTH, str: firstname }),
            })}
            subtitle={t(getSubtitleKey({ isOrganiser, state }))}
            bubble={getBubble()}
            isTitleLoading={isLoadingUserMe}
            isSubtitleLoading={state.type === 'loading'}
          />
          {renderFeatured()}
        </Wrapper>
        <Box className="h-8 rounded-t-sheet bg-background" />
      </Box>
      <HomeSessionListHeader />
    </Box>
  );
};
