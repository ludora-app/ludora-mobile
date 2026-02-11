import { Fragment } from 'react';
import { useTranslate } from '@tolgee/react';
import { Box, Icon, Separator, String, WrapperScrollView } from '@ludo/ui';

import { useOnBoardingStore } from '../stores/on-boarding.store';
import OnBoardingStep3Item from '../components/on-boarding-step-3/on-boarding-step-3-item.component';

export default function OnBoardingStep3Screen() {
  const { t } = useTranslate();
  const sportPreferences = useOnBoardingStore(state => state.sportPreferences);
  const hasSelectedSportPreference = sportPreferences.length > 0;
  return (
    <WrapperScrollView contentContainerClassName="gap-8 pt-8">
      <String variant="body-3" font="primaryBold" className="text-center">
        {t('on-boarding.step-3.title')}
      </String>
      <Box className="gap-5">
        {hasSelectedSportPreference &&
          sportPreferences.map((sportPreference, index) => (
            <Fragment key={sportPreference.sport}>
              <OnBoardingStep3Item sportPreference={sportPreference} />
              {index !== sportPreferences.length - 1 && <Separator deviderClassName="bg-ring" />}
            </Fragment>
          ))}
        {!hasSelectedSportPreference && (
          <Box className="items-center gap-2">
            <Icon name="ludo-cry" className="size-24" />
            <String className="text-center">{t('on-boarding.step-3.no-sport-preference')}</String>
          </Box>
        )}
      </Box>
    </WrapperScrollView>
  );
}
