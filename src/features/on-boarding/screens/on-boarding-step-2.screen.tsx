

import { useTranslate } from '@tolgee/react';
import { BoxRowCenterBetween, String, WrapperScrollView } from '@ludo/ui';

import { SPORTS } from '@/constants/sports.constants';

import OnBoardingStep2SportItem from '../components/on-boarding-step-2-sport-item.component';

export default function OnBoardingStep2Screen() {
  const { t } = useTranslate();

  return (
    <WrapperScrollView contentContainerClassName="gap-8 pt-8">
      <String variant="body-3" font="primaryBold" className="text-center">
        {t('on-boarding.step-2.title')}
      </String>
      <BoxRowCenterBetween className="flex-wrap gap-5">
        {SPORTS.map(sport => (
          <OnBoardingStep2SportItem key={sport.id} sport={sport} />
        ))}
      </BoxRowCenterBetween>
    </WrapperScrollView>
  );
}
