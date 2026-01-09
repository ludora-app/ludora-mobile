import { useLocalSearchParams } from 'expo-router';

import { FiltersAddressesReturnParams } from '@/features/filters/filters-addresses/types/filters-addresses.types';

import FilterLocation from './filter-location.component';

export default function FilterLocationWrapper() {
  const { address, getUserLocation } = useLocalSearchParams<FiltersAddressesReturnParams>();
  return <FilterLocation address={address} getUserLocation={getUserLocation} />;
}
