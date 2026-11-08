import { cn } from '@chillui/ui';
import { StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, Icon, Image, String } from '@ludo/ui';

import { Sport } from '@/types/sports.types';
import COLORS from '@/constants/colors.contstants';
import { convertMToKm } from '@/utils/distance.utils';
import { getSportPlaceHolder } from '@/utils/sports.utils';
import { FieldResponseDto, FieldResponseDtoType } from '@/api/generated/model';

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 12px 26px -16px rgba(120, 40, 25, 0.4)',
  },
});

type FieldSlotsCardProps = {
  className?: string;
  field: FieldResponseDto;
  /** Sport whose placeholder is shown when the field has no photo. */
  sport: Sport;
};

/**
 * Field card of the design system: photo, name, address and distance, then the content passed as
 * children (start times, availabilities). Public fields show their badge and the meeting point note.
 */
export const FieldSlotsCard = (props: PropsWithChildren<FieldSlotsCardProps>) => {
  const { children, className, field, sport } = props;
  const { t } = useTranslate();
  const { fieldImages, name, shortAddress, type, userDistance } = field;

  const imageUrl = fieldImages?.[0]?.url;
  const isPublic = type === FieldResponseDtoType.PUBLIC;
  const address = userDistance ? `${shortAddress} · ${convertMToKm(userDistance)} ${t('common.km')}` : shortAddress;

  return (
    <Box className={cn('overflow-hidden rounded-3xl bg-white', className)} style={styles.shadow}>
      <Box className="h-28 bg-darkSoft">
        <Image source={imageUrl ? { uri: imageUrl } : getSportPlaceHolder(sport)} contentFit="cover" className="size-full" />
        {isPublic && (
          <BoxRow className="absolute top-3 left-3 h-7 items-center gap-1.5 rounded-full bg-tertiary px-2.5">
            <Icon name="people-regular" color={COLORS.dark} size="xs" />
            <String variant="body-xs" font="primaryExtraBold">
              {t('field-slots-card.public_badge')}
            </String>
          </BoxRow>
        )}
      </Box>
      <Box className="gap-2 px-3.5 pt-3 pb-3.5">
        <String variant="body-1" font="primaryBold" truncate>
          {name ?? shortAddress}
        </String>
        <BoxRow className="items-center gap-1.5">
          <Icon name="location-regular" color={COLORS.primary} size="xs" />
          <String variant="body-sm" colorVariant="muted" className="flex-1" truncate>
            {address}
          </String>
        </BoxRow>
        {children}
        {isPublic && (
          <BoxRow className="items-center gap-1.5">
            <Icon name="pin-location-regular" color={COLORS.muted} size="sm" />
            <String variant="body-sm" font="primarySemiBold" colorVariant="muted" className="flex-1" truncate>
              {t('field-slots-card.meeting_point')}
            </String>
          </BoxRow>
        )}
      </Box>
    </Box>
  );
};
