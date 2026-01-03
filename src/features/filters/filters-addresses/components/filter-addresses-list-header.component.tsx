import { memo } from 'react';
import { cn } from '@chillui/ui';
import { Box, Icon, String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import { TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { FiltersAddressesScreenParams } from '../types/filters-addresses.types';

interface FilterAddressesListHeaderProps {
  isLoading: boolean;
  getCurrentLocation: () => Promise<{ locationFound: boolean }>;
}

function FilterAddressesListHeader(props: FilterAddressesListHeaderProps) {
  const { GoBackPath } = useLocalSearchParams<FiltersAddressesScreenParams>();
  const router = useRouter();
  const { getCurrentLocation, isLoading } = props;
  const { t } = useTranslate();

  const handlePress = async () => {
    const { locationFound } = await getCurrentLocation();
    if (locationFound) {
      router.dismissTo({
        params: { getUserLocation: 'true' },
        pathname: GoBackPath,
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
        <Icon name="target-regular" color="#000" />
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
