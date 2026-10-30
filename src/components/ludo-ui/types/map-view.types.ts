import { StyleProp, ViewStyle } from 'react-native';

export type MapCoordinates = {
  latitude: number;
  longitude: number;
};

export type MapViewProps = {
  center: MapCoordinates;
  circleRadiusKm?: number;
  className?: string;
  hasMarker?: boolean;
  style?: StyleProp<ViewStyle>;
  zoom?: number;
};
