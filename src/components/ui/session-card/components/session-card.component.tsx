import { cn } from '@chillui/ui';
import { useRouter } from 'expo-router';
import { memo, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { VariantProps } from 'tailwind-variants';
import { Box, BoxRow, Card, Image, String } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import { getSportImage } from '@/utils/sports.utils';
import { FindOneSessionResponseData, JoinSessionResponseData, SessionCollectionItemDto } from '@/api/generated/model';
import {
  formatSessionDateRange,
  formatSessionStartDate,
  getOrganizerName,
  getRemainingSeats,
  getSessionFillRatio,
} from '@/utils/sessions.utils';

import { sessionCardTv } from './session-card.styles';
import { SessionCardInfoRow } from './session-card-info-row.component';
import { SessionCardJoinButton } from './session-card-join-button.component';

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 10px 22px -14px rgba(120, 40, 25, 0.35)',
  },
});

/** Height of a `default` card without join button, plus the space between two cards of a list. */
export const SESSION_CARD_LIST_ITEM_HEIGHT = 150;

type SessionCardProps = {
  className?: string;
  /** Extra `SessionCardInfoRow`s under the date and the place. */
  extraInfoRows?: ReactNode;
  hasJoinButton?: boolean;
  item: FindOneSessionResponseData | SessionCollectionItemDto;
  onJoinSuccess?: (data: JoinSessionResponseData) => void;
  onPress?: () => void;
  variant?: VariantProps<typeof sessionCardTv>['variant'];
};

const SessionCardComponent = (props: SessionCardProps) => {
  const {
    className,
    extraInfoRows,
    hasJoinButton = false,
    item,
    onJoinSuccess,
    onPress,
    variant = 'default',
  } = props;
  const { t } = useTranslate();
  const router = useRouter();
  const { endDate, fieldShortAddress, gameMode, level, sport, startDate, uid, userDistance } = item;

  const isSuggestion = variant === 'suggestion';
  const { container, infoRows, pill, sportImage, sportTile } = sessionCardTv({ variant });

  const remainingSeats = getRemainingSeats(item);
  const organizer = item.creator ? getOrganizerName(item.creator) : undefined;
  const levelLabel = Number(level) === 0 ? t('session-card.all_levels') : t(`common.session_level_${level}`);
  const subtitle = [organizer && t('session-card.organizer', { name: organizer }), levelLabel]
    .filter(Boolean)
    .join(' · ');
  const date = isSuggestion ? formatSessionStartDate(startDate) : formatSessionDateRange({ endDate, startDate });
  const place = userDistance ? `${fieldShortAddress} · ${userDistance} ${t('common.km')}` : fieldShortAddress;

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    router.navigate(ROUTES.SESSION.INDEX_UID(uid));
  };

  return (
    <Card
      onPress={handlePress}
      className={container({ className })}
      style={isSuggestion ? undefined : styles.shadow}
    >
      <BoxRow className="items-center gap-3">
        <Box className={sportTile()}>
          <Image source={getSportImage(sport)} contentFit="contain" className={sportImage()} />
        </Box>
        <Box className="flex-1">
          {isSuggestion ? (
            <String variant="body-2" font="secondaryExtraBold" truncate>
              {`${t(`common.session_sport_${sport}`)} · ${t(`common.game_mode_${gameMode}`, { space: ' ' })}`}
            </String>
          ) : (
            <String font="primaryBold" truncate>
              {`${t(`common.session_sport_${sport}`)} · ${t(`common.game_mode_${gameMode}`, { space: ' ' })}`}
            </String>
          )}
          <String
            variant={isSuggestion ? 'body-sm' : 'body-xs'}
            font="primarySemiBold"
            colorVariant="muted"
            truncate
          >
            {subtitle}
          </String>
        </Box>
        <Box className={pill({ className: cn({ 'bg-darkSoft': remainingSeats === 0 }) })}>
          <String variant="body-xs" font="primaryExtraBold">
            {remainingSeats > 0 ? t('session-card.remaining_seats', { count: remainingSeats }) : t('session-card.full')}
          </String>
        </Box>
      </BoxRow>
      {!isSuggestion && (
        <Box className="h-1.5 overflow-hidden rounded-full bg-darkSoft">
          <Box className="h-full rounded-full bg-primary" style={{ width: `${getSessionFillRatio(item) * 100}%` }} />
        </Box>
      )}
      <Box className={infoRows()}>
        <SessionCardInfoRow iconName="calendar-regular" isHighlighted={isSuggestion}>
          {date}
        </SessionCardInfoRow>
        <SessionCardInfoRow iconName="location-regular" isHighlighted={isSuggestion}>
          {place}
        </SessionCardInfoRow>
        {extraInfoRows}
      </Box>
      {hasJoinButton && (
        <SessionCardJoinButton sessionUid={uid} size={isSuggestion ? 'md' : 'sm'} onJoinSuccess={onJoinSuccess} />
      )}
    </Card>
  );
};

export const SessionCard = memo(SessionCardComponent);
