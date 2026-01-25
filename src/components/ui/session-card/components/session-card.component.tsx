import { useMemo } from 'react';
import { cn } from '@chillui/ui';
import { isArray } from 'radash';
import { Link } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { Pressable, StyleSheet } from 'react-native';
import { Box, BoxGrow, BoxRow, Icon, Image, String } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import ROUTES from '@/constants/ROUTES';
import { getSportImage } from '@/utils/sports.utils';
import { truncateString } from '@/utils/string.utils';
import { formatDateShort, formatToHour } from '@/utils/time.utils';
import { FindOneSessionResponseData, SessionCollectionItemDto } from '@/api/generated/model';

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.1)',
  },
});

interface SessionCardProps {
  isNextSession?: boolean;
  session: SessionCollectionItemDto | FindOneSessionResponseData;
}

export default function SessionCard(props: SessionCardProps) {
  const { isNextSession = false, session } = props;
  const {
    endDate,
    fieldShortAddress,
    gameMode,
    maxPlayersPerTeam,
    sessionTeams,
    sport,
    startDate,
    uid: id,
    userDistance,
  } = session || {};

  const { t } = useTranslate();

  const sessionImage = useMemo(() => sport && getSportImage(sport), [sport]);

  return (
    <Link href={ROUTES.SESSION.INDEX_UID(id)} asChild>
      <Pressable style={styles.shadow} className="z-10 rounded-xl">
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

            <BoxGrow className="gap-1.5 bg-white px-3 py-2">
              <BoxRow className="items-center gap-1">
                <BoxRow className="max-w-1/2 items-center">
                  <String variant="body-xs" font="primaryBold" colorVariant="primary" truncate>
                    {sessionTeams[0].teamName}
                  </String>
                  <String variant="body-xs" font="primaryBold" colorVariant="primary">
                    {` (${sessionTeams[0].numberOfPlayers}/${maxPlayersPerTeam})`}
                  </String>
                </BoxRow>
                <Box>
                  <String variant="body-xs" font="primaryBold">
                    {`${t('common.vs').toUpperCase()}`}
                  </String>
                </Box>
                <BoxRow className="max-w-1/2 items-center">
                  <String variant="body-xs" font="primaryBold" colorVariant="secondary" truncate>
                    {sessionTeams[1].teamName}
                  </String>
                  <String variant="body-xs" font="primaryBold" colorVariant="secondary">
                    {` (${sessionTeams[1].numberOfPlayers}/${maxPlayersPerTeam})`}
                  </String>
                </BoxRow>
              </BoxRow>
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
      </Pressable>
    </Link>
  );
}
