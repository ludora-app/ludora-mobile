import { useTranslate } from '@tolgee/react';
import { Box, BoxCenter, Button, Card, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { EmptyResult } from '@/components/ui/empty-resulat';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

import { HOME_SESSIONS_WIDE_DISTANCE_KM } from '../../constants/home.constants';
import { useGetHomeSessionsDistance } from '../../queries/get-home-sessions.query';
import { useHomeSessionFiltersStore } from '../../stores/home-sessions-filters.store';

/**
 * Empty list. Without sport chip nor filter, no session exists around: the area can be widened to 20 km.
 * Otherwise, the usual empty result.
 */
export const HomeSessionListEmpty = () => {
  const { t } = useTranslate();
  const { trackEvent } = useAnalytics();
  const numberOfFilters = useHomeSessionFiltersStore(state => state.numberOfFilters);
  const widenArea = useHomeSessionFiltersStore(state => state.widenArea);
  const distance = useGetHomeSessionsDistance();

  if (numberOfFilters > 0) {
    return (
      <Box className="px-4">
        <EmptyResult className="mt-4" hasRandomTitle randomOptions={5} title="home.sessions_empty_result_v" />
      </Box>
    );
  }

  const handleWiden = () => {
    trackEvent({ data: { distance_km: HOME_SESSIONS_WIDE_DISTANCE_KM }, eventName: ANALYTICS_EVENTS.HOME.AREA_WIDENED });
    widenArea();
  };

  return (
    <Box className="px-4">
      <Card className="items-center gap-2 px-6 py-6">
        <BoxCenter className="size-14 rounded-full bg-tertiarySoft">
          <Icon name="map-regular" color={COLORS.primary} size="lg" />
        </BoxCenter>
        <String variant="body-2" font="secondaryExtraBold" className="text-center">
          {t('home.sessions.none_around_title', { distance })}
        </String>
        <String variant="body-sm" colorVariant="muted" className="text-center">
          {t('home.sessions.none_around_description')}
        </String>
        {distance < HOME_SESSIONS_WIDE_DISTANCE_KM && (
          <Button
            title={t('home.sessions.widen_area', { distance: HOME_SESSIONS_WIDE_DISTANCE_KM })}
            variant="outlined"
            colorVariant="dark"
            size="sm"
            className="mt-2"
            fit
            onPress={handleWiden}
          />
        )}
      </Card>
    </Box>
  );
};
