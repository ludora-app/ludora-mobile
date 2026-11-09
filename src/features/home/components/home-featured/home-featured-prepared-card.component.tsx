import { useToast } from '@chillui/ui';
import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, Button, Card, Image, Skeleton, String } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import { ErrorResponse } from '@/api/orval.instance';
import { getSportImage } from '@/utils/sports.utils';
import { convertMToKm } from '@/utils/distance.utils';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { formatSessionDateRange } from '@/utils/sessions.utils';
import { useCreateSession } from '@/queries/create-session.query';
import { SessionCardInfoRow } from '@/components/ui/session-card';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';
import { CreateSessionFromRequestDtoVisibility } from '@/api/generated/model';

import { useGetHomePreparedSession } from '../../queries/get-home-prepared-session.query';
import { HomeFeaturedPreparedPlayersHint } from './home-featured-prepared-players-hint.component';

/**
 * The session Ludora prepared for the player. Nothing is saved before "Publier ma session".
 * Until the "Modifier la session" page (SCRUM-693), "Modifier" opens the prepared session screen of the on-boarding,
 * where the field and the slot can be changed.
 */
export const HomeFeaturedPreparedCard = () => {
  const { t } = useTranslate();
  const router = useRouter();
  const { toast } = useToast();
  const { trackError, trackEvent } = useAnalytics();
  const { field, isLoading, preparedSession } = useGetHomePreparedSession({ isEnabled: true });
  const { isPending: isPublishing, mutateAsync: createSession } = useCreateSession();

  if (isLoading || !preparedSession) {
    return <Skeleton variant="rectangle" className="h-56 w-full rounded-card" />;
  }

  const { endDate, gameMode, level, sport, startDate } = preparedSession;
  const levelLabel = t(`common.session_level_${level}`).toLowerCase();
  const fieldName = field?.name ?? field?.shortAddress;
  const fieldLabel = field?.userDistance
    ? `${fieldName} · ${convertMToKm(field.userDistance)} ${t('common.km')}`
    : fieldName;

  const handleEdit = () => {
    trackEvent({ eventName: ANALYTICS_EVENTS.HOME.FEATURED_PREPARED_EDIT_PRESSED });
    router.navigate(ROUTES.ON_BOARDING.SESSIONS_PREPARED);
  };

  // The header switches to the next match card on its own: creating invalidates the player's sessions
  const handlePublish = async () => {
    if (!field) return;
    try {
      const response = await createSession({
        endDate: endDate.toISOString(),
        fieldUid: field.uid,
        gameMode,
        level,
        sport,
        startDate: startDate.toISOString(),
        visibility: CreateSessionFromRequestDtoVisibility.PUBLIC,
      });
      trackEvent({
        data: { session_uid: response.data.uid, sport },
        eventName: ANALYTICS_EVENTS.HOME.FEATURED_PREPARED_PUBLISHED,
      });
      toast({ message: t('home.header.sub_title_published'), variant: 'success' });
    } catch (error) {
      trackEvent({
        data: { error_message: (error as ErrorResponse)?.api_error_detail ?? 'Unknown error' },
        eventName: ANALYTICS_EVENTS.HOME.FEATURED_PREPARED_PUBLISH_FAILED,
      });
      trackError({ error, extra: { context: 'HomeFeaturedPreparedCard' } });
    }
  };

  return (
    <Card className="gap-3 p-4">
      <BoxRow className="items-center gap-3">
        <Box className="size-11 items-center justify-center rounded-control bg-tertiarySoft">
          <Image source={getSportImage(sport)} contentFit="contain" className="size-8" />
        </Box>
        <Box className="flex-1">
          <String variant="body-2" font="secondaryExtraBold" truncate>
            {`${t(`common.session_sport_${sport}`)} · ${t(`common.game_mode_${gameMode}`, { space: ' ' })}`}
          </String>
          <String variant="body-xs" font="primarySemiBold" colorVariant="muted" numberOfLines={2}>
            {t('home.prepared.subtitle', { level: levelLabel })}
          </String>
        </Box>
        <Button
          title={t('home.prepared.edit')}
          variant="outlined"
          colorVariant="muted"
          size="xs"
          className="h-9 rounded-button-sm"
          fit
          onPress={handleEdit}
        />
      </BoxRow>
      <Box className="gap-1.5">
        <SessionCardInfoRow iconName="calendar-regular" isHighlighted>
          {formatSessionDateRange({ endDate: endDate.toISOString(), startDate: startDate.toISOString() })}
        </SessionCardInfoRow>
        {!!field && (
          <SessionCardInfoRow iconName="location-regular" isHighlighted>
            {fieldLabel}
          </SessionCardInfoRow>
        )}
      </Box>
      {!!field && <HomeFeaturedPreparedPlayersHint fieldUid={field.uid} preparedSession={preparedSession} />}
      {field ? (
        <Button
          title={t('home.prepared.publish')}
          colorVariant="secondary"
          size="lg"
          isLoading={isPublishing}
          onPress={handlePublish}
        />
      ) : (
        // Without a field in the play area, the prepared session screen lets the player choose one
        <Button title={t('home.prepared.choose_place')} colorVariant="muted" size="lg" onPress={handleEdit} />
      )}
    </Card>
  );
};
