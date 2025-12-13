// src/components/ui/navigation/tab-bar-custom.component.tsx
import { Box, BoxRow } from '@chillui/ui';
import Svg, { Path } from 'react-native-svg';
import { useState, useCallback } from 'react';
import { StyleSheet, LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TAB_ROUTES } from '@/constants/TABS_ROUTES';

import { TAB_BAR_CONSTANTS } from '../constants';
import TabBarItemTrigger from './tab-bar-item/tab-bar-item-trigger.component copy';
import TabBarButtonTrigger from './tab-bar-button/tab-bar-button-trigger.component';

const { BAR_HEIGHT, CORNER_RADIUS, EDGE_Y, NOTCH_DEPTH, NOTCH_EDGE_Y, NOTCH_RADIUS } = TAB_BAR_CONSTANTS;

export default function TabBar() {
  const { bottom } = useSafeAreaInsets();

  const [width, setWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const getPath = useCallback((w: number) => {
    const barHeight = BAR_HEIGHT + 30;

    const rMain = NOTCH_RADIUS;
    const rCorner = CORNER_RADIUS;
    const yTop = NOTCH_EDGE_Y;
    const yBottom = NOTCH_DEPTH;

    const cMainY = yBottom - rMain;

    const cCornerY = yTop + rCorner;

    const dist = rMain + rCorner;
    const dy = cMainY - cCornerY;
    const dx = Math.sqrt(Math.max(0, dist * dist - dy * dy));

    const centerX = w / 2;
    const cCornerLeftX = centerX - dx;
    const cCornerRightX = centerX + dx;

    const k = rCorner / (rMain + rCorner);

    const pContactLeftX = cCornerLeftX + k * (centerX - cCornerLeftX);
    const pContactLeftY = cCornerY + k * (cMainY - cCornerY);

    const pContactRightX = centerX + (centerX - pContactLeftX);
    const pContactRightY = pContactLeftY;

    return [
      `M 0 ${EDGE_Y}`,
      `Q 0 ${EDGE_Y - 8} 8 ${EDGE_Y - 8}`,

      `L ${cCornerLeftX} ${yTop}`,

      `A ${rCorner} ${rCorner} 0 0 1 ${pContactLeftX} ${pContactLeftY}`,

      `A ${rMain} ${rMain} 0 1 0 ${pContactRightX} ${pContactRightY}`,

      `A ${rCorner} ${rCorner} 0 0 1 ${cCornerRightX} ${yTop}`,

      `L ${w - 8} ${EDGE_Y - 8}`,
      `Q ${w} ${EDGE_Y - 8} ${w} ${EDGE_Y}`,

      `V ${barHeight}`,
      `H 0`,
      `Z`,
    ].join(' ');
  }, []);

  return (
    <Box style={{ height: BAR_HEIGHT + bottom }} onLayout={onLayout} className="absolute bottom-0 w-full">
      <Box className="flex-1">
        {/* Fond concave */}
        {width > 0 && (
          <Svg width={width} style={StyleSheet.absoluteFill}>
            <Path d={getPath(width)} fill="#FFFFFF" stroke="rgba(0,0,0,0.06)" strokeWidth={1} />
          </Svg>
        )}

        {/* Tabs */}
        <BoxRow className="h-full">
          <BoxRow className="flex-1 pr-8">
            {TAB_ROUTES.slice(1, 3).map((route, index) => (
              <TabBarItemTrigger key={index} {...route} />
            ))}
          </BoxRow>
          <BoxRow className="flex-1 pl-8">
            {TAB_ROUTES.slice(3).map((route, index) => (
              <TabBarItemTrigger key={index} {...route} />
            ))}
          </BoxRow>
        </BoxRow>
      </Box>

      <TabBarButtonTrigger />
      <Box className="w-full bg-white" style={{ height: bottom }} />
    </Box>
  );
}
