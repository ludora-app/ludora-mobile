import { BoxRowCenterBetween, Icon, String } from '@ludo/ui';

import { useFiltersStore, selectFilters } from '../../store/filters.store';

export default function FilterDistanceRadiusController() {
  const maxDistance = useFiltersStore(state => selectFilters(state).maxDistance);
  const setFilters = useFiltersStore(state => state.setFilters);

  const handleIncrement = () => {
    const value = Math.min(maxDistance + 1, 50);
    setFilters({ maxDistance: value });
  };
  const handleDecrement = () => {
    const value = Math.max(maxDistance - 1, 1);
    setFilters({ maxDistance: value });
  };

  return (
    <BoxRowCenterBetween className="mb-2">
      <Icon name="minus-circle-regular-colored" onPress={handleDecrement} pressEffectSize="xs" size="lg" />
      {!!maxDistance && (
        <String useFastText={false}>
          <String useFastText={false} font="primaryBold">
            {maxDistance}
          </String>{' '}
          km
        </String>
      )}
      {!maxDistance && <String>-</String>}

      <Icon name="add-circle-regular-colored" onPress={handleIncrement} pressEffectSize="xs" size="lg" />
    </BoxRowCenterBetween>
  );
}
