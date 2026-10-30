import { MapCoordinates } from '../../types/map-view.types';

// Meters per pixel at zoom 0 on the equator (Web Mercator)
const METERS_PER_PIXEL_AT_ZOOM_0 = 156_543.03;

// Leaves some room around the circle so it never touches the map edges
const MAP_CIRCLE_MARGIN_RATIO = 1.6;

/**
 * Returns the zoom level that shows the whole circle on a map of the given width.
 */
export const getMapZoomForRadius = ({
  center,
  mapWidth,
  radiusKm,
}: {
  center: MapCoordinates;
  mapWidth: number;
  radiusKm: number;
}) => {
  const metersPerPixel = (radiusKm * 2 * 1000 * MAP_CIRCLE_MARGIN_RATIO) / mapWidth;
  return Math.log2((METERS_PER_PIXEL_AT_ZOOM_0 * Math.cos((center.latitude * Math.PI) / 180)) / metersPerPixel);
};
