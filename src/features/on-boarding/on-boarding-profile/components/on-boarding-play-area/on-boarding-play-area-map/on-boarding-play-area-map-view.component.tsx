import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { BoxGrow, BoxRow, Button, IconButton } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';

import { useOnBoardingStore } from '../../../../stores/on-boarding.store';
import { OnBoardingPlayAreaMap } from './on-boarding-play-area-map.component';
import { OnBoardingPlayAreaSearch } from '../on-boarding-play-area-search.component';
import { OnBoardingPlayAreaMapSheet } from './on-boarding-play-area-map-sheet.component';
import { useOnBoardingPlayAreaLocation } from '../../../hooks/on-boarding-play-area-location.hook';

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 8px 18px -8px rgba(51, 49, 50, 0.4)',
  },
});

export const OnBoardingPlayAreaMapView = () => {
  const { t } = useTranslate();
  const [query, setQuery] = useState('');
  const { isLocating, locate } = useOnBoardingPlayAreaLocation();
  const setIsPlayAreaMapVisible = useOnBoardingStore(state => state.setIsPlayAreaMapVisible);

  return (
    <BoxGrow>
      <BoxGrow>
        <OnBoardingPlayAreaMap />
        <OnBoardingPlayAreaSearch
          query={query}
          onChangeQuery={setQuery}
          className="absolute top-12.5 right-4 left-4"
          inputContainerClassName="shadow-lg"
        />
        <BoxRow className="absolute right-4 bottom-2 left-4 items-center justify-between">
          <Button
            title={t('on-boarding.play-area.hide_map')}
            onPress={() => setIsPlayAreaMapVisible(false)}
            colorVariant="white"
            size="md"
            fit
            className="rounded-full px-3"
            style={styles.shadow}
            titleProps={{ font: 'primaryExtraBold' }}
            iconProps={{ className: 'mr-2', color: COLORS.primary, name: 'text-align-right-regular', position: 'left' }}
          />
          <IconButton
            iconName="gps-location-regular"
            iconColor={COLORS.primary}
            colorVariant="white"
            rounded="circle"
            size="lg"
            isLoading={isLocating}
            loadingIndicatorProps={{ color: COLORS.primary, name: 'swing' }}
            className="size-13"
            style={styles.shadow}
            onPress={locate}
          />
        </BoxRow>
      </BoxGrow>
      <OnBoardingPlayAreaMapSheet />
    </BoxGrow>
  );
};
