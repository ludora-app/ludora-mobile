import { useMemo } from 'react';
import { cn } from '@chillui/ui';
import { isArray } from 'radash';
import { StyleSheet } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Box, BoxGrow, BoxRow, Icon, Image, String } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { getSportImage } from '@/utils/sports.utils';
import { SessionCollectionItem } from '@/api/generated/model';
import { formatDateShort, formatToHour } from '@/utils/time.utils';

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
  },
});

interface SessionCardProps {
  isNextSession?: boolean;
  session: SessionCollectionItem;
}

export default function SessionCard(props: SessionCardProps) {
  const { isNextSession = false, session } = props;
  const { endDate, fieldShortAddress, gameMode, maxPlayersPerTeam, sessionTeams, sport, startDate, userDistance } =
    session || {};

  const { t } = useTranslate();

  const sessionImage = useMemo(() => sport && getSportImage(sport), [sport]);

  return (
    <Box style={styles.container}>
      {!isNextSession && (
        <Box className="h-16 overflow-hidden rounded-t-xl">
          <Image source={sessionImage} contentFit="cover" className="size-full" />
        </Box>
      )}
      <Box
        className={cn('overflow-hidden rounded-xl border border-black/10 bg-white', {
          'rounded-t-none border-t-0': !isNextSession,
        })}
      >
        <BoxRow>
          {/* left card content */}
          <Box className="items-center justify-center bg-[#F5F5F5] p-4">
            <Image source={sessionImage} className="size-7" />
            <String font="primaryExtraBold">{t(`common.game_mode_${gameMode}`, { space: '' })}</String>
          </Box>

          {/* center card content */}
          <BoxGrow className="gap-1.5 bg-white px-3 py-2">
            <String variant="body-xs" font="primaryBold" className="text-black/50">
              {isArray(sessionTeams) &&
                sessionTeams
                  .map(team => `${team.teamName} (${team.numberOfPlayers}/${maxPlayersPerTeam})`)
                  .join(' vs ')}
            </String>
            <BoxRow className="items-center gap-4">
              <BoxRow className="items-center gap-1">
                <Icon name="calendar-2-regular" color={COLORS.primary} size="sm" />
                <String variant="body-sm" font="primaryExtraBold">
                  {formatDateShort({ date: startDate })}
                </String>
              </BoxRow>
              <BoxRow className="items-center gap-1">
                <Icon name="clock-regular" color={COLORS.primary} size="sm" />
                <String variant="body-sm" font="primaryExtraBold">
                  {t('session-card.session_time', {
                    end_time: formatToHour({ date: endDate }),
                    start_time: formatToHour({ date: startDate }),
                  })}
                </String>
              </BoxRow>
            </BoxRow>
            <BoxRow className="items-center gap-1">
              <Icon name="location-solid" color={COLORS.primary} size="xs" />
              <Box className="flex-1">
                <String variant="body-xs" numberOfLines={1} ellipsizeMode="tail">
                  {fieldShortAddress}
                </String>
              </Box>
              <String variant="body-xs"> {userDistance ? `(${userDistance} km)` : ''}</String>
            </BoxRow>
          </BoxGrow>

          {/* right card content */}
          <Box className="items-center justify-center pr-4">
            <Icon name="chevron-right-regular" color="#000" size="sm" />
          </Box>
        </BoxRow>
      </Box>
    </Box>
  );
}
