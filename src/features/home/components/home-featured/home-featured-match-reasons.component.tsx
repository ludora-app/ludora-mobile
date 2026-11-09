import { useTranslate } from '@tolgee/react';
import { BoxRow, Icon, String } from '@ludo/ui';

import dayjs from '@/lib/dayjs';
import COLORS from '@/constants/colors.contstants';

import { MatchReason } from '../../utils/home-match-reasons.utils';

type HomeFeaturedMatchReasonsProps = {
  reasons: MatchReason[];
};

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Why the session matches the player, as green pills: "Ton niveau", "Samedi aprèm", "À 1,4 km". */
export const HomeFeaturedMatchReasons = (props: HomeFeaturedMatchReasonsProps) => {
  const { reasons } = props;
  const { t } = useTranslate();

  if (reasons.length === 0) return null;

  const getLabel = (reason: MatchReason) => {
    switch (reason.type) {
      case 'level':
        return t('home.featured.reason_level');
      case 'slot':
        return t(`home.featured.reason_slot_${reason.timePeriod}`, {
          day: capitalize(dayjs(reason.startDate).format('dddd')),
        });
      default:
        return t('home.featured.reason_distance', { distance: reason.distance });
    }
  };

  return (
    <BoxRow className="flex-wrap gap-2">
      {reasons.map(reason => (
        <BoxRow key={reason.type} className="h-7 items-center gap-1 rounded-full bg-successSoft px-2.5">
          <Icon name="check-solid" color={COLORS.success} size="2xs" />
          <String variant="body-xs" font="primaryExtraBold" className="text-success">
            {getLabel(reason)}
          </String>
        </BoxRow>
      ))}
    </BoxRow>
  );
};
