import { cn } from '@chillui/ui';
import { Pressable } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { SportPreferenceResponseDataLevel } from '@/api/generated/model';

type OnBoardingSportFormSheetLevelProps = {
  isSelected: boolean;
  level: SportPreferenceResponseDataLevel;
  onPress: (level: SportPreferenceResponseDataLevel) => void;
};

export const OnBoardingSportFormSheetLevel = (props: OnBoardingSportFormSheetLevelProps) => {
  const { isSelected, level, onPress } = props;
  const { t } = useTranslate();

  return (
    <Pressable
      onPress={() => onPress(level)}
      className={cn('rounded-field border-2 border-input bg-white px-3.5 py-3', {
        'border-primary bg-primarySoft': isSelected,
      })}
    >
      <BoxRow className="items-center gap-3">
        <Box className="flex-1">
          <String font="primaryExtraBold">{t(`common.user_level_${level}`)}</String>
          <String variant="body-sm" font="primarySemiBold" colorVariant="muted">
            {t(`on-boarding.sport-formsheet.level_description_${level}`)}
          </String>
        </Box>
        {isSelected && <Icon name="checked-circle-solid" size="lg" color={COLORS.primary} />}
      </BoxRow>
    </Pressable>
  );
};
