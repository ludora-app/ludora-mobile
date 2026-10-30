import { useState } from 'react';
import { cn } from '@chillui/ui';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { LayoutChangeEvent, StyleSheet, useWindowDimensions } from 'react-native';

import COLORS from '@/constants/colors.contstants';
import { IS_IOS } from '@/constants/platform.constants';

import { Box } from '../box';
import { getMapZoomForRadius } from './map-view.utils';
import { MapViewProps } from '../../types/map-view.types';

const DEFAULT_ZOOM = 12;

const MAP_CIRCLE_COLOR = 'rgba(241, 89, 36, 0.16)';

/**
 * Static map centered on a point: Apple Maps on iOS (no key), Google Maps on Android.
 * With `circleRadiusKm`, draws the circle and fits the zoom to it unless `zoom` is given.
 */
export const MapView = (props: MapViewProps) => {
  const { center, circleRadiusKm, className, hasMarker = false, style, zoom } = props;
  const { width: windowWidth } = useWindowDimensions();
  const [mapWidth, setMapWidth] = useState(windowWidth);

  const handleLayout = (event: LayoutChangeEvent) => setMapWidth(event.nativeEvent.layout.width);

  const fittedZoom = circleRadiusKm ? getMapZoomForRadius({ center, mapWidth, radiusKm: circleRadiusKm }) : DEFAULT_ZOOM;
  const cameraPosition = { coordinates: center, zoom: zoom ?? fittedZoom };
  const circles = circleRadiusKm
    ? [{ center, color: MAP_CIRCLE_COLOR, lineColor: COLORS.primary, lineWidth: 2, radius: circleRadiusKm * 1000 }]
    : [];

  return (
    <Box className={cn('overflow-hidden', className)} style={style} onLayout={handleLayout}>
      {IS_IOS ? (
        <AppleMaps.View
          style={StyleSheet.absoluteFill}
          cameraPosition={cameraPosition}
          circles={circles}
          markers={hasMarker ? [{ coordinates: center, tintColor: COLORS.secondary }] : []}
          uiSettings={{ compassEnabled: false, myLocationButtonEnabled: false, scaleBarEnabled: false }}
        />
      ) : (
        <GoogleMaps.View
          style={StyleSheet.absoluteFill}
          cameraPosition={cameraPosition}
          circles={circles}
          markers={hasMarker ? [{ coordinates: center }] : []}
          uiSettings={{
            compassEnabled: false,
            mapToolbarEnabled: false,
            myLocationButtonEnabled: false,
            zoomControlsEnabled: false,
          }}
        />
      )}
    </Box>
  );
};
