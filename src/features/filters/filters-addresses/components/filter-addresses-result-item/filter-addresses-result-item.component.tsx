import { memo } from 'react';
import { cn, Places } from '@chillui/ui';
import { Box, Icon, String } from '@ludo/ui';
import { TouchableOpacity } from 'react-native';

interface FilterAddressesResultItemProps {
  item: Places;
  isFetchingPlaceDetails: boolean;
  onSelect: (placeId: string) => void;
}

function FilterAddressesResultItem(props: FilterAddressesResultItemProps) {
  const { isFetchingPlaceDetails, item, onSelect } = props;

  return (
    <TouchableOpacity
      className={cn('flex-row items-center gap-3', { 'opacity-50': isFetchingPlaceDetails })}
      onPress={() => onSelect(item.placePrediction?.placeId)}
      disabled={isFetchingPlaceDetails}
    >
      <Box className="rounded-full bg-ring/30 p-4">
        <Icon name="location-regular" color="#000" />
      </Box>
      <String>{item.placePrediction?.text?.text}</String>
    </TouchableOpacity>
  );
}

export default memo(
  FilterAddressesResultItem,
  (prevProps, nextProps) =>
    prevProps.item.placePrediction?.placeId === nextProps.item.placePrediction?.placeId &&
    prevProps.isFetchingPlaceDetails === nextProps.isFetchingPlaceDetails &&
    prevProps.onSelect === nextProps.onSelect,
);
