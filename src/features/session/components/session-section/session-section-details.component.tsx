import { useTranslate } from '@tolgee/react';
import { Linking, Platform, Pressable } from 'react-native';
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
  const { endDate,
    fieldLatitude,
    fieldLongitude,
    fieldShortAddress,
    gameMode,
    sessionTeams,
    sport,
    startDate,
    userDistance } = session || {};
  const sideTeam = useSessionTeamStore(state => state.sideTeam);
  const { t } = useTranslate();

  const sportImage = getSportImage(sport);

  const handleOpenMaps = () => {
    const latLng = `${fieldLatitude},${fieldLongitude}`;
    const label = fieldShortAddress;
    const url = Platform.select({
      android: `geo:0,0?q=${latLng}(${label})`,
      ios: `maps:0,0?q=${label}@${latLng}`,
    });

    Linking.openURL(url || `https://www.google.com/maps/search/?api=1&query=${latLng}`);
  };

  return (
    <SessionSectionWrapperItem className="flex-row items-center gap-3">
      <Box className="items-center">
        <Image source={sportImage} className="size-8" />
        <String font="primaryBold">{t(`common.game_mode_${gameMode}`, { space: '' })}</String>
      </Box>
      <BoxGrow className="gap-2">
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
        <BoxRow className="items-center flex-wrap">
          <BoxRow className="items-center gap-1 mr-2">
            <SessionSectionIcon sideTeam={sideTeam ?? 'left'} name="calendar-2-regular" />
            <String font="primaryExtraBold" size="sm">{formatDateShort({ date: startDate })}</String>
          </BoxRow>
          <BoxRow className="items-center gap-1">
            <SessionSectionIcon sideTeam={sideTeam ?? 'left'} name="clock-regular" />
            <String font="primaryExtraBold" size="sm">
              {t('session-card.session_time', {
                end_time: formatToHour({ date: endDate }),
                start_time: formatToHour({ date: startDate }),
              })}
            </String>
          </BoxRow>
        </BoxRow>
        <Pressable onPress={handleOpenMaps} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
          <BoxRow className="items-center gap-1">
            <SessionSectionIcon sideTeam={sideTeam ?? 'left'} name="location-solid" />
            <String size="sm" className="underline">{fieldShortAddress}</String>
            {userDistance &&
              <String variant="body-xs" truncate>
                {`(${userDistance} ${t('common.km').toLowerCase()})`}
              </String>}
          </BoxRow>
        </Pressable>
      </BoxGrow>
    </SessionSectionWrapperItem>
  );
}
