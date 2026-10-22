import { useState } from 'react';
import { useTranslate } from '@tolgee/react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Box, BoxRow, Button, Chip, Image, String } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { getSportImage } from '@/utils/sports.utils';
import { useGetSportGameModes } from '@/queries/get-sports.query';
import { FormSheetFooter } from '@/components/ui/form-sheet/components/form-sheet-footer.component';
import { FormSheetHeader } from '@/components/ui/form-sheet/components/form-sheet-header.component';
import { FormSheetWrapper } from '@/components/ui/form-sheet/components/form-sheet-wrapper.component';
import { FormSheetContent } from '@/components/ui/form-sheet/components/form-sheet-content.component';
import { CreateSportPreferenceDataGameModesItem, SportPreferenceResponseDataLevel } from '@/api/generated/model';

import { useOnBoardingStore } from '../stores/on-boarding.store';
import { OnBoardingSportFormSheetParams } from '../types/on-boarding.types';
import { ON_BOARDING_SPORT_LEVELS } from '../constants/on-boarding.constants';
import { OnBoardingSportFormSheetLevel } from '../components/on-boarding-sport-formsheet-level.component';

export const OnBoardingSportFormSheet = () => {
  const { t } = useTranslate();
  const router = useRouter();
  const { sport } = useLocalSearchParams<OnBoardingSportFormSheetParams>();
  const sportGameModes = useGetSportGameModes(sport);
  const sportPreference = useOnBoardingStore(state => state.sportPreferences.find(item => item.sport === sport));
  const upsertSportPreference = useOnBoardingStore(state => state.upsertSportPreference);
  const removeSportPreference = useOnBoardingStore(state => state.removeSportPreference);

  const [level, setLevel] = useState<SportPreferenceResponseDataLevel | undefined>(sportPreference?.level);
  const [gameModes, setGameModes] = useState<CreateSportPreferenceDataGameModesItem[]>(
    sportPreference?.gameModes ?? [],
  );

  const hasSelection = !!level || gameModes.length > 0;

  const handleToggleGameMode = (gameMode: CreateSportPreferenceDataGameModesItem) => {
    setGameModes(current =>
      current.includes(gameMode) ? current.filter(item => item !== gameMode) : [...current, gameMode],
    );
  };

  const handleValidate = () => {
    if (!level) return;
    upsertSportPreference({ gameModes, level, sport });
    router.back();
  };

  const handleRemove = () => {
    removeSportPreference(sport);
    setLevel(undefined);
    setGameModes([]);
  };

  return (
    <FormSheetWrapper>
      <FormSheetHeader />
      <FormSheetContent className="gap-4">
        <BoxRow className="items-center justify-between">
          <BoxRow className="items-center gap-3">
            <Image source={getSportImage(sport)} className="size-11" contentFit="contain" />
            <String variant="title-1">{t(`common.session_sport_${sport}`)}</String>
          </BoxRow>
          {hasSelection && (
            <Button
              title={t('common.remove')}
              onPress={handleRemove}
              colorVariant="danger"
              variant="outlined"
              size="sm"
              fit
              iconProps={{ className: 'mr-1', color: COLORS.danger, name: 'trash-bin-regular', position: 'left' }}
            />
          )}
        </BoxRow>

        <Box className="gap-2.5">
          <String variant="body-sm" font="primaryExtraBold" colorVariant="muted">
            {t('on-boarding.sport-formsheet.level_title')}
          </String>
          {ON_BOARDING_SPORT_LEVELS.map(item => (
            <OnBoardingSportFormSheetLevel key={item} level={item} isSelected={level === item} onPress={setLevel} />
          ))}
        </Box>

        <Box className="gap-2.5">
          <String variant="body-sm" font="primaryExtraBold" colorVariant="muted">
            {t('on-boarding.sport-formsheet.game_modes_title')}
          </String>
          <BoxRow className="flex-wrap gap-2">
            {sportGameModes.map(gameMode => {
              const isSelected = gameModes.includes(gameMode);
              return (
                <Chip
                  key={gameMode}
                  title={t(`common.game_mode_${gameMode}`, { space: ' ' })}
                  onPress={() => handleToggleGameMode(gameMode)}
                  isSelected={isSelected}
                  className="px-4"
                  size="lg"
                />
              );
            })}
          </BoxRow>
        </Box>
      </FormSheetContent>

      <FormSheetFooter buttonTitle={t('common.validate')} onButtonPress={handleValidate} isButtonDisabled={!level} />
    </FormSheetWrapper>
  );
};
