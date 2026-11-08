import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { PropsWithChildren } from 'react';
import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, Button, Card, Icon, Image, Skeleton, String } from '@ludo/ui';

import dayjs from '@/lib/dayjs';
import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { getSportImage } from '@/utils/sports.utils';
import { convertMToKm } from '@/utils/distance.utils';
import { TIconsAll } from '@/constants/icons.constants';
import { FieldResponseDto } from '@/api/generated/model';
import { useDurationLabel } from '@/components/ui/duration-picker';
import { formatDateShort, formatToHour } from '@/utils/time.utils';

import { PreparedSessionValues } from '../../utils/prepared-session.utils';

type OnBoardingSessionsPreparedCardProps = {
  field: FieldResponseDto | null;
  isLoadingField: boolean;
  playersPerTeam: number | null;
  preparedSession: PreparedSessionValues;
};

function PreparedCardRow(props: PropsWithChildren<{ iconName: TIconsAll }>) {
  const { children, iconName } = props;

  return (
    <BoxRow className="items-center gap-3">
      <Icon name={iconName} color={COLORS.primary} size="md" />
      <String font="primarySemiBold" className="flex-1" truncate>
        {children}
      </String>
    </BoxRow>
  );
}

export const OnBoardingSessionsPreparedCard = (props: OnBoardingSessionsPreparedCardProps) => {
  const { field, isLoadingField, playersPerTeam, preparedSession } = props;
  const { t } = useTranslate();
  const router = useRouter();
  const getDurationLabel = useDurationLabel();
  const { endDate, gameMode, level, sport, startDate } = preparedSession;

  const startDateIso = startDate.toISOString();
  const date = formatDateShort({ date: startDateIso, format: 'dddd D MMM' });
  const duration = dayjs(endDate).diff(startDate, 'minute');
  const durationLabel = getDurationLabel(duration);
  const fieldName = field?.name ?? field?.shortAddress;
  const fieldLabel = field?.userDistance
    ? `${fieldName} · ${convertMToKm(field.userDistance)} ${t('common.km')}`
    : fieldName;

  const handleChooseField = () => router.navigate(ROUTES.ON_BOARDING.SESSIONS_FIELDS);

  return (
    <Card className="gap-3.5 p-4.5">
      <BoxRow className="items-center gap-3">
        <Image source={getSportImage(sport)} contentFit="contain" className="size-11.5" />
        <Box className="flex-1">
          <String variant="body-3" font="secondaryExtraBold" truncate>
            {`${t(`common.session_sport_${sport}`)} · ${t(`common.game_mode_${gameMode}`, { space: ' ' })}`}
          </String>
          <String variant="body-sm" font="primarySemiBold" colorVariant="muted">
            {t('on-boarding.sessions.prepared.level', { level: t(`common.session_level_${level}`).toLowerCase() })}
          </String>
        </Box>
        {/* Until the edit page (SCRUM-693), editing means choosing another field and slot */}
        <Button
          title={t('on-boarding.sessions.prepared.edit')}
          variant="outlined"
          colorVariant="muted"
          size="xs"
          className="h-9 rounded-button-sm"
          fit
          onPress={handleChooseField}
        />
      </BoxRow>
      <Box className="h-0.5 bg-border" />
      <Box className="gap-3">
        <PreparedCardRow iconName="calendar-regular">{date.charAt(0).toUpperCase() + date.slice(1)}</PreparedCardRow>
        <PreparedCardRow iconName="clock-regular">
          {`${formatToHour({ date: startDateIso, format: 'HH:mm' })} · ${durationLabel}`}
        </PreparedCardRow>
        {isLoadingField && <Skeleton variant="text" className="h-6 w-48" />}
        {!isLoadingField && field && <PreparedCardRow iconName="location-regular">{fieldLabel}</PreparedCardRow>}
        {!isLoadingField && !field && (
          <Pressable onPress={handleChooseField}>
            <BoxRow className="min-h-13 items-center gap-3 rounded-field border-2 border-dashed border-primary bg-primarySoft px-3.5">
              <Icon name="location-regular" color={COLORS.primary} size="md" />
              <String font="primaryExtraBold" colorVariant="primary" className="flex-1">
                {t('on-boarding.sessions.prepared.choose_place')}
              </String>
              <Icon name="chevron-right-regular" color={COLORS.primary} size="sm" />
            </BoxRow>
          </Pressable>
        )}
        {!!playersPerTeam && (
          <PreparedCardRow iconName="user-regular">
            {t('on-boarding.sessions.prepared.players', { count: playersPerTeam * 2 })}
          </PreparedCardRow>
        )}
      </Box>
    </Card>
  );
};
