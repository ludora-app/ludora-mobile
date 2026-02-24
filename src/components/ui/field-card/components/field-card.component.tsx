import { StyleSheet } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { ScalePressable } from '@chillui/ui';
import { PropsWithChildren, useMemo } from 'react';
import { ImageBackground, Box, Chip, Icon, String, BoxRow } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { getSportImage } from '@/utils/sports.utils';
import { convertMToKm } from '@/utils/distance.utils';
import { FieldResponseDto, FieldResponseDtoType } from '@/api/generated/model';

const styles = StyleSheet.create({
  shadowBlack: {
    boxShadow: '0px 0px 10px #00000040',
  },
  shadowPrimary: {
    boxShadow: '0px 0px 10px #F1450040',
  },
  shadowSecondary: {
    boxShadow: '0px 0px 10px #864C9E40',
  },
});

interface FieldCardProps {
  onPress?: () => void;
  field: FieldResponseDto;
  shadowVariant?: 'primary' | 'black' | 'secondary';
}

export default function FieldCard(props: PropsWithChildren<FieldCardProps>) {
  const { children, field, onPress, shadowVariant = 'black' } = props;
  const { t } = useTranslate();

  const { fieldImages, name, shortAddress, sports, type, userDistance = 0 } = field || {};

  const fieldImage = useMemo(() => {
    const customImage = fieldImages?.find(img => img.order === 0)?.url;
    if (customImage) return customImage;
    return getSportImage(sports[0]);
  }, [fieldImages, sports]);

  const handleShadow = useMemo(() => {
    if (shadowVariant === 'black') {
      return styles.shadowBlack;
    }
    if (shadowVariant === 'primary') {
      return styles.shadowPrimary;
    }
    return styles.shadowSecondary;
  }, [shadowVariant]);

  const handleIconColor = useMemo(() => {
    if (shadowVariant === 'black') {
      return COLORS.muted;
    }
    if (shadowVariant === 'primary') {
      return COLORS.primary;
    }
    if (shadowVariant === 'secondary') {
      return COLORS.secondary;
    }
    return COLORS.primary;
  }, [shadowVariant]);

  const content = (
    <Box style={handleShadow} className="rounded-xl">
      <Box className="h-16 overflow-hidden rounded-t-xl">
        <ImageBackground source={fieldImage} contentFit="cover" className="h-16">
          {type === FieldResponseDtoType.PUBLIC && (
            <Chip title={t(`common.field_type_${type}`)} size="2xs" className="mt-2 mr-2 ml-auto" />
          )}
        </ImageBackground>
      </Box>
      <Box className="overflow-hidden rounded-b-xl bg-white">
        <Box>
          {/* top card content */}
          <Box className="gap-2 bg-white px-3 py-2">
            <String font="primaryExtraBold">{name}</String>
            <BoxRow className="items-center gap-1">
              <Icon name="location-solid" color={handleIconColor} size="xs" />
              <Box className="no-wrap flex-1 flex-row items-center gap-2">
                <String variant="body-xs" numberOfLines={1} ellipsizeMode="tail">
                  {shortAddress}
                </String>
                <Box>
                  <String variant="body-xs">
                    {userDistance ? `(${convertMToKm(userDistance)} ${t('common.km').toLowerCase()})` : ''}
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
