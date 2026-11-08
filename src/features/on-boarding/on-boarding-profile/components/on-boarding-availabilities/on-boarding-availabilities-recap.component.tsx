import { useTranslate } from '@tolgee/react';
import { BoxRowCenter, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';

import { useOnBoardingStore } from '../../../stores/on-boarding.store';
import { getDayLabel } from '../../utils/on-boarding-availabilities.utils';
import { ON_BOARDING_MOMENTS, ON_BOARDING_DAYS_OF_WEEK } from '../../constants/on-boarding.constants';

export const OnBoardingAvailabilitiesRecap = () => {
  const { t } = useTranslate();
  const availabilities = useOnBoardingStore(state => state.availabilities);

  // e.g. "Ven. après-midi + soir · Sam. matin", in the grid order
  const recap = ON_BOARDING_DAYS_OF_WEEK.map(dayOfWeek => {
    const moments = ON_BOARDING_MOMENTS.filter(moment =>
      availabilities.some(item => item.dayOfWeek === dayOfWeek && item.timePeriod === moment.timePeriod),
    );
    if (moments.length === 0) return null;
    const momentsLabel = moments.map(moment => t(moment.labelKey).toLowerCase()).join(' + ');
    return `${getDayLabel({ dayOfWeek, format: 'short' })} ${momentsLabel}`;
  })
    .filter(Boolean)
    .join(' · ');

  return (
    <BoxRowCenter className="gap-2">
      <Icon name={recap ? 'calendar-regular' : 'info-circle-regular'} size="sm" color={COLORS.primary} />
      <String variant="body-sm" font="primarySemiBold" colorVariant="muted" className="shrink" numberOfLines={2}>
        {recap || t('on-boarding.availabilities.recap_empty')}
      </String>
    </BoxRowCenter>
  );
};
