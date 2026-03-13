import { memo } from 'react';
import { Box, Icon, String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import { TouchableOpacity } from 'react-native';
import { cn, LoadingIndicator } from '@chillui/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { FiltersAddressesReturnParams, FiltersAddressesScreenParams } from '../types/filters-addresses.types';

interface FilterAddressesListHeaderProps {
  isLoading: boolean;
  getCurrentLocation: () => Promise<{ locationFound: boolean }>;
}

function FilterAddressesListHeader(props: FilterAddressesListHeaderProps) {
  const { goBackPath } = useLocalSearchParams<FiltersAddressesScreenParams>();
  const router = useRouter();
  const { getCurrentLocation, isLoading } = props;
  const { t } = useTranslate();

  const handlePress = async () => {
    const { locationFound } = await getCurrentLocation();
    if (locationFound) {
      const params: FiltersAddressesReturnParams = { getUserLocation: 'true' };
      router.dismissTo({
        params,
        pathname: goBackPath,
      });
    }
  };

  return (
    <TouchableOpacity
      className={cn('flex-row items-center gap-3', { 'opacity-50': isLoading })}
      onPress={handlePress}
      disabled={isLoading}
    >

      <Box className="rounded-full bg-ring/30 p-4">
        {!isLoading && <Icon name="target-regular" color="#000" />}
        {isLoading && <LoadingIndicator name="swing" color="#000" />}
      </Box>
      <Box>
        <String>{t('filter-addresses.header_title')}</String>
        <String variant="body-sm" colorVariant="muted">
          {t('filter-addresses.header_description')}
        </String>
      </Box>
    </TouchableOpacity>
  );
}

export default memo(FilterAddressesListHeader, (prevProps, nextProps) => prevProps.isLoading === nextProps.isLoading);
