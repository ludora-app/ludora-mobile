import { list } from 'radash';
import { StyleSheet } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Image, String, BoxRow } from '@ludo/ui';
import { Box, cn, ScalePressable } from '@chillui/ui';

import { getSportImage } from '@/utils/sports.utils';
import { SportProps } from '@/constants/sports.constants';
import { SportPreferenceResponseDataLevel } from '@/api/generated/model';

export interface SportLevelCardProps {
  sport: SportProps;
  translationKey?: string;
  onPress: (sport: SportProps) => void;
  level?: SportPreferenceResponseDataLevel;
}

const styles = StyleSheet.create({
  selectedShadow: {
    boxShadow: '0 2px 4px #F1592440',
  },
  shadow: {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
  },
});

export default function SportLevelCard({
  level,
  onPress,
  sport,
  translationKey = 'common.select_sport'
}: SportLevelCardProps) {
  const { t } = useTranslate();
  const isSelected = !!level;
  const sportImage = getSportImage(sport.name);

  return (
    <ScalePressable
      onPress={() => onPress(sport)}
      className={cn('aspect-square min-h-36 w-[45%] rounded-lg bg-white', {
        'border-primary/40 bg-primary/10 border': isSelected,
      })}
      style={isSelected ? styles.selectedShadow : styles.shadow}
    >
      <Box className='h-10 items-center justify-center'>
        <String font="primaryBold">{t(`common.session_sport_${sport.name}`).toUpperCase()}</String>
      </Box>
      <Box className='flex-1'>
        <Image source={sportImage} className="size-full" contentFit="contain" />
      </Box>
      <Box className='h-14 items-center justify-center gap-1'>
        <String variant="body-sm" font="primarySemiBold" truncate>
          {level ? t(`common.user_level_${level}`) : t(translationKey)}
        </String>
        <BoxRow className="items-center gap-2">
          {list(2).map((_, index) => (
            <Box
              key={index}
              className={cn('bg-primary size-2 rounded-full', {
                'bg-primary/20': index >= (level || 0),
              })}
            />
          ))}
        </BoxRow>
      </Box>
    </ScalePressable>
  );
}
