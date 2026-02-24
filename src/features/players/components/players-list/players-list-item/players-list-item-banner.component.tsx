import { useMemo } from 'react';
import { BoxRow, Icon, Image, String } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { getSportImage } from '@/utils/sports.utils';
import { FindAllUsersResponseDataDto } from '@/api/generated/model';

type Props = {
  commonSports?: FindAllUsersResponseDataDto["commonSports"];
  isSameCity?: boolean;
};

export default function PlayersListItemBanner({ commonSports, isSameCity }: Props) {
  const hasCommonSports = commonSports && commonSports.length > 0;
  const hasCommonPoints = hasCommonSports || isSameCity;

  const commonSportImages = useMemo(
    () =>
      (commonSports ?? []).map(sport => ({
        image: getSportImage(sport),
        sport,
      })),
    [commonSports],
  );

  if (!hasCommonPoints) return null;

  return (
    <BoxRow className="items-center gap-2 bg-primary/5 px-3 py-2">
      <Icon name="ludo-idea" size="xl" />
      <BoxRow className="flex-1 flex-wrap items-center gap-1">
        {hasCommonSports ? (
          <BoxRow className="items-center gap-1">
            {commonSportImages.map(({ image, sport }) => (
              <Image key={sport} source={image} className="size-4" />
            ))}
            <String variant="body-xs" font="primaryBold" colorVariant="primary">
              {commonSports!.length > 1 ? `${commonSports!.length} sports en commun` : '1 sport en commun'}
            </String>
          </BoxRow>
        ) : null}
        {hasCommonSports && isSameCity ? (
          <String variant="body-xs" colorVariant="primary"> • </String>
        ) : null}
        {isSameCity ? (
          <BoxRow className="items-center gap-1">
            <Icon name="location-solid" color={COLORS.primary} size="xs" />
            <String variant="body-xs" font="primaryBold" colorVariant="primary">
              Même ville
            </String>
          </BoxRow>
        ) : null}
      </BoxRow>
    </BoxRow>
  );
}
