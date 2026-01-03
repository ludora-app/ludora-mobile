import { cn } from '../../../utils';
import { Box } from '../../box';
import { PropsWithChildren } from 'react';
import { SliderTrackProps } from '../../../types';

import { twStyles } from '../styles/Slider.styles';
import { useSliderTrack } from '../hooks/useSliderTrack';
import { sliderDefaultProps } from '../utils/defaultProps';

/**
 * Track container for the slider
 *
 * @example
 * ```tsx
 * <SliderTrack clickable={true}>
 *   <SliderRange />
 * </SliderTrack>
 * ```
 *
 * @param children - Child components (SliderRange)
 * @param className - Custom CSS classes for styling
 * @param clickable - Whether clicking on the track moves the thumb (default: true)
 */
export function SliderTrack(props: PropsWithChildren<SliderTrackProps>) {
  const { children, className, clickable = sliderDefaultProps.trackClickable, ...rest } = props;
  const { measureTrack } = useSliderTrack(clickable);

  return (
    <Box {...rest} onLayout={measureTrack} renderToHardwareTextureAndroid className={cn(twStyles.track, className)}>
      {children}
    </Box>
  );
}

SliderTrack.displayName = 'SliderTrack';
