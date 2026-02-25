import { isString } from 'radash';
import { Place } from '@chillui/ui';
import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { memo, useEffect, useMemo } from 'react';
import { Box, Button, Icon, Separator, String, BoxRowCenterBetween } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { parse } from '@/utils/json.utils';
import useGetUserLocation from '@/hooks/user-location.hook';
import { FiltersAddressesReturnParams } from '@/features/filters/filters-addresses/types/filters-addresses.types';

import { useFiltersStore, selectFilters } from '../../store/filters.store';
import { FiltersAddressesScreenParams } from '../../types/filters.types';

type FilterLocationProps = FiltersAddressesReturnParams;

function FilterLocation(props: FilterLocationProps) {
  const { address, getUserLocation } = props;
  const { t } = useTranslate();
  const router = useRouter();

  const selectedAddress = useFiltersStore(state => selectFilters(state).address);
  const nearby = useFiltersStore(state => selectFilters(state).nearby);
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
      setFilters({ address: incomingAddress, nearby: undefined });
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
    const params: FiltersAddressesScreenParams = { goBackPath: ROUTES.FILTERS.FILTER };
    router.navigate({
      params,
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
    <Box className="border-ring gap-3 rounded-xl border bg-white p-3 py-2">
      {/* Header */}
      <BoxRowCenterBetween>
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
      </BoxRowCenterBetween>

      <Box className="items-center gap-2">
        <Button
          title={t('filters.location_button_search_address')}
          colorVariant="light"
          className="border-ring flex-1 rounded-md bg-white"
          onPress={handlePressSearch}
          iconProps={{ color: COLORS.muted, name: 'map-regular', position: 'left-outside' }}
          size="sm"
        />

        <Separator title={t('common.or')} />

        <Button
          title={t('filters.location_button_nearby')}
          colorVariant="light"
          className="border-ring flex-1 rounded-md bg-white"
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

export default memo(
  FilterLocation,
  (prevProps, nextProps) =>
    prevProps.address === nextProps.address && prevProps.getUserLocation === nextProps.getUserLocation,
);
