import { useOnBoardingStore } from '../stores/on-boarding.store';
import { OnBoardingAvailability } from '../types/on-boarding.types';
import { areAllAvailabilitiesSelected } from '../utils/on-boarding-availabilities.utils';

/** Selected state of a group of slots (a cell, a day, a moment or a shortcut) and its toggle. */
export const useOnBoardingAvailabilitiesToggle = (availabilities: OnBoardingAvailability[]) => {
  const isSelected = useOnBoardingStore(state =>
    areAllAvailabilitiesSelected({ availabilities, selected: state.availabilities }),
  );
  const setAvailabilities = useOnBoardingStore(state => state.setAvailabilities);

  const toggle = () => setAvailabilities(availabilities, !isSelected);

  return { isSelected, toggle };
};
