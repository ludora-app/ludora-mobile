import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { BoxCenter, Card, CardFooter, CardTitle, Icon, Image, String } from '@ludo/ui';

import { SportItem } from '@/types/sports.types';
import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { getSportImage } from '@/utils/sports.utils';

import { useOnBoardingStore } from '../../stores/on-boarding.store';
import { OnBoardingSportFormSheetParams } from '../../types/on-boarding.types';

type OnBoardingSportsCardProps = {
  sport: SportItem;
};

export const OnBoardingSportsCard = (props: OnBoardingSportsCardProps) => {
  const { sport } = props;
  const { t } = useTranslate();
  const router = useRouter();
  const sportPreference = useOnBoardingStore(state => state.sportPreferences.find(item => item.sport === sport.code));

  const isSelected = !!sportPreference;
  const gameModesLabel = sportPreference?.gameModes
    .map(gameMode => t(`common.game_mode_${gameMode}`, { space: ' ' }))
    .join(', ');
  const levelLabel = sportPreference ? t(`common.user_level_${sportPreference.level}`) : '';
  const summary = gameModesLabel ? `${levelLabel} · ${gameModesLabel}` : levelLabel;

  const handlePress = () => {
    const params: OnBoardingSportFormSheetParams = { sport: sport.code };
    router.navigate({ params, pathname: ROUTES.ON_BOARDING.SPORT_FORM_SHEET });
  };

  return (
    <Card onPress={handlePress} isSelected={isSelected} className="w-[47.5%] items-center gap-2 px-2 pt-4 pb-3.5">
      {isSelected && (
        <BoxCenter className="absolute top-2.5 right-2.5 size-6 rounded-full bg-primary">
          <Icon name="check-solid" size="xs" color={COLORS.white} />
        </BoxCenter>
      )}
      <CardTitle className="tracking-wide">{t(`common.session_sport_${sport.code}`).toUpperCase()}</CardTitle>
      <Image source={getSportImage(sport.code)} className="size-16" contentFit="contain" />
      <CardFooter>
        <String variant="body-sm" font="primarySemiBold" className="text-center" numberOfLines={2}>
          {isSelected ? summary : t('common.add')}
        </String>
      </CardFooter>
    </Card>
  );
};
