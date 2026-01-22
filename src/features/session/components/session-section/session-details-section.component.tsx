import { StyleSheet } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { BoxRow, Box, BoxGrow, Icon, Image, String } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { getSportImage } from '@/utils/sports.utils';
import { formatDateShort, formatToHour } from '@/utils/time.utils';
import { FindOneSessionResponseData } from '@/api/generated/model';

import SessionSectionWrapper from './session-section-wrapper.component';

type SessionDetailsSectionProps = {
  session: FindOneSessionResponseData;
};

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
});

export default function SessionDetailsSection({ session }: SessionDetailsSectionProps) {
  const { endDate, fieldShortAddress, gameMode, sessionTeams, sport, startDate, userDistance } = session || {};
  const { t } = useTranslate();
  const sportImage = getSportImage(sport);

  return (
    <SessionSectionWrapper withShadow>
      <BoxRow className="items-center gap-3 rounded-lg">
        <Box className="items-center">
          <Image source={sportImage} className="size-12" />
          <String font="primaryBold">{t(`common.game_mode_${gameMode}`, { space: '' })}</String>
        </Box>
        <BoxGrow className="gap-1">
          <String font="primaryExtraBold" variant="body-2" colorVariant="primary">
            {sessionTeams?.map(team => team.teamName).join(' VS ')}
          </String>
          <BoxRow className="items-center gap-4">
            <BoxRow className="items-center gap-1">
              <Icon name="calendar-2-regular" color={COLORS.primary} size="sm" />
              <String font="primaryExtraBold">{formatDateShort({ date: startDate })}</String>
            </BoxRow>
            <BoxRow className="items-center gap-1">
              <Icon name="clock-regular" color={COLORS.primary} size="sm" />
              <String font="primaryExtraBold">
                {t('session-card.session_time', {
                  end_time: formatToHour({ date: endDate }),
                  start_time: formatToHour({ date: startDate }),
                })}
              </String>
            </BoxRow>
          </BoxRow>
          <BoxRow className="items-center gap-1">
            <Icon name="location-solid" color={COLORS.primary} size="sm" />
            <String>{fieldShortAddress}</String>
            {userDistance && <String variant="body-xs"> {`(${userDistance} km)`}</String>}
          </BoxRow>
        </BoxGrow>
      </BoxRow>
    </SessionSectionWrapper>
  );
}
