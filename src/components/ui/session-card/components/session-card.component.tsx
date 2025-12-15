import { useMemo } from 'react';
import { cn } from '@chillui/ui';
import { StyleSheet } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { tennisBall, basketballBall, footballBall } from 'assets';
import { Box, BoxGrow, BoxRow, Icon, Image, String } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { formatDateShort, formatToHour } from '@/utils/time.utils';
import { SessionCollectionSuggestionItem } from '@/api/generated/model';

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
  session: SessionCollectionSuggestionItem;
}

export default function SessionCard(props: SessionCardProps) {
  const { isNextSession = false, session } = props;

  const { t } = useTranslate();

  const sessionImage = useMemo(() => {
    switch (session.sport) {
      case 'BASKETBALL':
        return basketballBall;
      case 'TENNIS':
        return tennisBall;
      case 'PADDEL':
        return tennisBall;
      case 'FOOTBALL':
        return footballBall;
      default:
        return basketballBall;
    }
  }, [session.sport]);

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
            <String font="primaryExtraBold">{t(`session-card.${session.gameMode}`)}</String>
          </Box>

          {/* center card content */}
          <BoxGrow className="gap-1.5 bg-white px-3 py-2">
            <String variant="body-xs" font="primaryBold" className="text-black/50">
              {session.sessionTeams
                .map(team => `${team.teamName} (${team.numberOfPlayers}/${session.maxPlayersPerTeam})`)
                .join(' vs ')}
            </String>
            <BoxRow className="items-center gap-4">
              <BoxRow className="items-center gap-1">
                <Icon name="calendar-2-regular" color={COLORS.primary} size="sm" />
                <String variant="body-sm" font="primaryExtraBold">
                  {formatDateShort({ date: session.startDate })}
                </String>
              </BoxRow>
              <BoxRow className="items-center gap-1">
                <Icon name="clock-regular" color={COLORS.primary} size="sm" />
                <String variant="body-sm" font="primaryExtraBold">
                  {t('session-card.session_time', {
                    end_time: formatToHour({ date: session.endDate }),
                    start_time: formatToHour({ date: session.startDate }),
                  })}
                </String>
              </BoxRow>
            </BoxRow>
            <BoxRow className="items-center gap-1">
              <Icon name="location-solid" color={COLORS.primary} size="xs" />
              <Box className="flex-1">
                <String variant="body-xs" numberOfLines={1} ellipsizeMode="tail">
                  {session.fieldShortAddress}
                </String>
              </Box>
              <String variant="body-xs"> {session.userDistance ? `(${session.userDistance} km)` : ''}</String>
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

// export default memo(
//   SessionCard,
//   (prevProps, nextProps) =>
//     prevProps.isNextSession === nextProps.isNextSession && prevProps.session.uid === nextProps.session.uid,
// );
