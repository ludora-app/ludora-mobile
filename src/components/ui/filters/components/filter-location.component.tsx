import { isString } from 'radash';
import { Place } from '@chillui/ui';
import { useEffect, useMemo } from 'react';
import { useTranslate } from '@tolgee/react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Box, Button, Icon, Separator, String } from '@ludo/ui';

import ROUTES from '@/constants/ROUTES';
import COLORS from '@/constants/COLORS';
import { parse } from '@/utils/json.utils';
import useGetUserLocation from '@/hooks/user-location.hook';
import { FiltersAddressesReturnParams } from '@/features/filters/filters-addresses/types/filters-addresses.types';

import { useFiltersStore } from '../store/filters.store';

export default function FilterLocation() {
  const { t } = useTranslate();
  const router = useRouter();
  const { address, getUserLocation } = useLocalSearchParams<FiltersAddressesReturnParams>();

  const selectedAddress = useFiltersStore(state => state.filters.address);
  const nearby = useFiltersStore(state => state.filters.nearby);
  const setFilters = useFiltersStore(state => state.setFilters);

  const { getCurrentLocation, isLoading: isLoadingUserLocation } = useGetUserLocation({
    showAlert: true,
    type: 'FIELDS',
  });

  const incomingAddress = useMemo(() => {
    if (!address || !isString(address)) return null;
    try {
      return parse(address) as Place;
    } catch {
      return null;
    }
  }, [address]);

  const incomingNearby = getUserLocation === 'true';

  useEffect(() => {
    if (incomingAddress) {
      setFilters({ address: incomingAddress, nearby: false });
      router.setParams({ address: undefined });
    }
  }, [incomingAddress, setFilters, router]);

  useEffect(() => {
    if (incomingNearby) {
      setFilters({ address: undefined, nearby: true });
      router.setParams({ getUserLocation: undefined });
    }
  }, [incomingNearby, setFilters, router]);

  const handlePressSearch = () => {
    router.navigate({
      params: { GoBackPath: ROUTES.FILTERS.FILTER_FIELDS },
      pathname: ROUTES.FILTERS.FILTER_ADDRESSES,
    });
  };

  const displayLocation = useMemo(() => {
    if (nearby) return t('filters.location_nearby_active');
    if (selectedAddress) return selectedAddress.shortFormattedAddress;
    return '';
  }, [nearby, selectedAddress, t]);

  const handlePressGetCurrentLocation = async () => {
    const { locationFound } = await getCurrentLocation();
    if (locationFound) {
      setFilters({ address: undefined, nearby: true });
      router.setParams({ address: undefined, getUserLocation: undefined });
    }
  };

  return (
    <Box className="gap-3 rounded-xl border border-ring bg-white p-3 py-2">
      {/* Header */}
      <Box className="flex-row items-center justify-between">
        <Box className="flex-1 flex-row items-center gap-2">
          <Icon name="football-field-regular" color="#666" />
          <String variant="body-sm" font="primaryBold" colorVariant="muted">
            {t('filters.location_title')}
          </String>
        </Box>
        <Box className="flex-1 items-end">
          <String variant="body-sm" font="primaryBold" truncate>
            {displayLocation}
          </String>
        </Box>
      </Box>

      <Box className="items-center gap-2">
        <Button
          title={t('filters.location_button_search_address')}
          colorVariant="light"
          className="flex-1 rounded-md border-ring"
          onPress={handlePressSearch}
          iconProps={{ color: COLORS.muted, name: 'map-regular', position: 'left-outside' }}
          size="sm"
        />

        <Separator title={t('common.or')} />

        <Button
          title={t('filters.location_button_nearby')}
          colorVariant="light"
          className="flex-1 rounded-md border-ring"
          onPress={handlePressGetCurrentLocation}
          isLoading={isLoadingUserLocation}
          iconProps={{
            color: COLORS.muted,
            name: 'gps-location-regular',
            position: 'left-outside',
          }}
          size="sm"
        />
      </Box>
    </Box>
  );
}
