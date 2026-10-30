import { useState } from 'react';
import { useTranslate } from '@tolgee/react';
import { Box, String, WrapperScrollView } from '@ludo/ui';

import { useOnBoardingStore } from '../../../stores/on-boarding.store';
import { OnBoardingPlayAreaRadius } from './on-boarding-play-area-radius.component';
import { OnBoardingPlayAreaSearch } from './on-boarding-play-area-search.component';
import { ON_BOARDING_PLACES_MIN_QUERY_LENGTH } from '../../constants/on-boarding.constants';
import { OnBoardingPlayAreaLocationCard } from './on-boarding-play-area-location-card.component';

export const OnBoardingPlayAreaList = () => {
  const { t } = useTranslate();
  const [query, setQuery] = useState('');
  const hasPlayArea = useOnBoardingStore(state => !!state.playArea);

  const isSearching = query.trim().length >= ON_BOARDING_PLACES_MIN_QUERY_LENGTH;

  return (
    <WrapperScrollView contentContainerClassName="gap-4 pt-5.5 pb-4" keyboardShouldPersistTaps="handled">
      <Box className="gap-1.5">
        <String variant="title-1" className="text-center">
          {t('on-boarding.play-area.title')}
        </String>
        <String variant="body-sm" colorVariant="muted" className="text-center">
          {t('on-boarding.play-area.description')}
        </String>
      </Box>
      <OnBoardingPlayAreaSearch query={query} onChangeQuery={setQuery} />
      {!isSearching && <OnBoardingPlayAreaLocationCard />}
      {!isSearching && hasPlayArea && <OnBoardingPlayAreaRadius />}
    </WrapperScrollView>
  );
};
