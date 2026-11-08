import { MapView } from '@ludo/ui';
import { StyleSheet } from 'react-native';

import { useOnBoardingStore } from '../../../../stores/on-boarding.store';
import { ON_BOARDING_MAP_SHEET_RADIUS } from '../../../constants/on-boarding.constants';

// Extends the map under the rounded top corners of the sheet
const styles = StyleSheet.create({
  map: {
    bottom: -ON_BOARDING_MAP_SHEET_RADIUS,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export const OnBoardingPlayAreaMap = () => {
  const playArea = useOnBoardingStore(state => state.playArea);
  const playAreaRadiusKm = useOnBoardingStore(state => state.playAreaRadiusKm);

  if (!playArea) return null;

  return (
    <MapView
      center={{ latitude: playArea.latitude, longitude: playArea.longitude }}
      circleRadiusKm={playAreaRadiusKm}
      style={styles.map}
      hasMarker
    />
  );
};
