import { useTranslate } from '@tolgee/react';
import { BoxRow, Box, BoxGrow, Image, String } from '@ludo/ui';

import { getSportImage } from '@/utils/sports.utils';
import { formatDateShort, formatToHour } from '@/utils/time.utils';
import { FindOneSessionResponseData } from '@/api/generated/model';

import SessionSectionIcon from './session-section-icon.component';
import { useSessionTeamStore } from '../../stores/session-team.store';
import SessionSectionWrapperItem from './section-section-wrapper/session-section-wrapper-item.component';

type SessionSectionDetailsProps = {
  session: FindOneSessionResponseData;
};

export default function SessionSectionDetails({ session }: SessionSectionDetailsProps) {
  const { endDate, fieldShortAddress, gameMode, sessionTeams, sport, startDate, userDistance } = session || {};
  const sideTeam = useSessionTeamStore(state => state.sideTeam);
  const { t } = useTranslate();

  const sportImage = getSportImage(sport);

  return (
    <SessionSectionWrapperItem className="flex-row items-center gap-3">
      <Box className="items-center">
        <Image source={sportImage} className="size-12" />
        <String font="primaryBold">{t(`common.game_mode_${gameMode}`, { space: '' })}</String>
      </Box>
      <BoxGrow className="gap-1">
        <BoxRow className="items-center gap-1">
          <Box className="max-w-[45%]">
            <String font="primaryExtraBold" variant="body-2" colorVariant="primary" truncate>
              {sessionTeams?.map(team => team.teamName)[0]}
            </String>
          </Box>
          <Box>
            <String font="primaryExtraBold" variant="body-2">
              {t('common.vs').toUpperCase()}
            </String>
          </Box>
          <Box className="flex-1">
            <String font="primaryExtraBold" variant="body-2" colorVariant="secondary" truncate>
              {sessionTeams?.map(team => team.teamName)[1]}
            </String>
          </Box>
        </BoxRow>
        <BoxRow className="items-center gap-4">
          <BoxRow className="items-center gap-1">
            <SessionSectionIcon sideTeam={sideTeam} name="calendar-2-regular" />
            <String font="primaryExtraBold">{formatDateShort({ date: startDate })}</String>
          </BoxRow>
          <BoxRow className="items-center gap-1">
            <SessionSectionIcon sideTeam={sideTeam} name="clock-regular" />
            <String font="primaryExtraBold">
              {t('session-card.session_time', {
                end_time: formatToHour({ date: endDate }),
                start_time: formatToHour({ date: startDate }),
              })}
            </String>
          </BoxRow>
        </BoxRow>
        <BoxRow className="items-center gap-1">
          <SessionSectionIcon sideTeam={sideTeam} name="location-solid" />
          <String>{fieldShortAddress}</String>
          {userDistance && <String variant="body-xs"> {`(${userDistance} ${t('common.km').toLowerCase()})`}</String>}
        </BoxRow>
      </BoxGrow>
    </SessionSectionWrapperItem>
  );
}
