import { StyleSheet } from 'react-native';
import { ImageBackground } from 'expo-image';
import { cn, ScalePressable } from '@chillui/ui';
import { PropsWithChildren, useMemo } from 'react';
import { Box, Chip, Icon, String, BoxRow } from '@ludo/ui';
import { tennisBall, basketballBall, footballBall } from 'assets';

import COLORS from '@/constants/COLORS';
import { convertMToKm } from '@/utils/distance.utils';
import { FieldResponseDto } from '@/api/generated/model';

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
  },
});

interface FieldCardProps {
  onPress?: () => void;
  field: FieldResponseDto;
}

export default function FieldCard(props: PropsWithChildren<FieldCardProps>) {
  const { children, field, onPress } = props;

  console.log('onPress', onPress);

  const sessionImage = useMemo(() => {
    switch (field.sport) {
      case 'BASKETBALL':
        return basketballBall;
      case 'TENNIS':
        return tennisBall;
      case 'PADDEL':
        return tennisBall;
      case 'FOOTBALL':
        return footballBall;
      default:
        return basketballBall;
    }
  }, [field.sport]);

  const content = (
    <Box style={styles.container}>
      <Box className="h-16 overflow-hidden rounded-t-xl">
        <ImageBackground source={sessionImage} contentFit="cover" className="h-16">
          {field.type === 'PUBLIC' && <Chip title="Terrain publique" size="2xs" className="ml-auto mr-2 mt-2" />}
        </ImageBackground>
      </Box>

      <Box className={cn('overflow-hidden rounded-b-xl border border-black/10 bg-white')}>
        <Box>
          {/* top card content */}
          <Box className="gap-2 bg-white px-3 py-2">
            <String font="primaryExtraBold">{field.name}</String>
            <BoxRow className="items-center gap-1">
              <Icon name="location-solid" color={COLORS.primary} size="xs" />
              <Box className="no-wrap flex-1 flex-row items-center gap-2">
                <String variant="body-xs" numberOfLines={1} ellipsizeMode="tail">
                  {field.shortAddress}
                </String>
                <Box>
                  <String variant="body-xs">
                    {field.userDistance ? `(${convertMToKm(field.userDistance)} km)` : ''}
                  </String>
                </Box>
              </Box>
            </BoxRow>

            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return onPress ? <ScalePressable onPress={onPress}>{content}</ScalePressable> : content;
}
