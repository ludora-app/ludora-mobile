import { PropsWithChildren } from 'react';

import { Box } from '../../box';
import { cn } from '../../../utils';
import { twStyles } from '../styles/Slider.styles';
import { sliderDefaultProps } from '../utils/defaultProps';
import { useSliderActions } from '../context/SliderContext';

export function SliderRootContent(
  props: PropsWithChildren<{ className?: string; orientation?: 'horizontal' | 'vertical' }>,
) {
  const { children, className, orientation = sliderDefaultProps.orientation, ...rest } = props;
  const vertical = orientation === 'vertical';
  const { getTouchOverflowSize, measureContainer, panResponder } = useSliderActions();

  const getTouchOverflowStyle = () => {
    const { height, width } = getTouchOverflowSize();
    const touchOverflowStyle: {
      marginTop?: number;
      marginBottom?: number;
      marginLeft?: number;
      marginRight?: number;
    } = {};
    if (width !== undefined && height !== undefined) {
      const verticalMargin = -height / 2;
      touchOverflowStyle.marginTop = verticalMargin;
      touchOverflowStyle.marginBottom = verticalMargin;
      const horizontalMargin = -width / 2;
      touchOverflowStyle.marginLeft = horizontalMargin;
      touchOverflowStyle.marginRight = horizontalMargin;
    }
    return touchOverflowStyle;
  };

  const touchOverflowStyle = getTouchOverflowStyle();

  return (
    <Box
      {...rest}
      onLayout={measureContainer}
      className={cn(vertical && twStyles.rootVertical, twStyles.root, className)}
    >
      {children}
      <Box className={twStyles.touchOverlay} style={touchOverflowStyle} {...(panResponder?.panHandlers || {})} />
    </Box>
  );
}
