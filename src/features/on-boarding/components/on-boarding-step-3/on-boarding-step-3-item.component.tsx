import { String, Box, BoxRow, Image } from '@ludo/ui';

import { getSportImage } from '@/utils/sports.utils';
import { GAMEMODES_BY_SPORT } from '@/constants/session.constants';
import { CreateSessionFromRequestDtoGameMode } from '@/api/generated/model';

import { SportPreferences } from '../../stores/on-boarding.store';
import OnBoardingStep3ItemGameModes from './on-boarding-step-3-item-game-modes';

interface OnBoardingStep3ItemProps {
  sportPreference: SportPreferences;
}

export default function OnBoardingStep3Item(props: OnBoardingStep3ItemProps) {
  const { sportPreference } = props;
  const selectedSport = sportPreference?.sport;

  const sportImage = getSportImage(selectedSport);
  return (
    <Box className="gap-3">
      <BoxRow className="items-center gap-2">
        <Image source={sportImage} className="size-8" />
        <String font="primarySemiBold">{sportPreference?.sport}</String>
      </BoxRow>
      <BoxRow className="flex-wrap gap-2">
        {GAMEMODES_BY_SPORT[selectedSport]?.map((gameMode: CreateSessionFromRequestDtoGameMode, index: number) => (
          <OnBoardingStep3ItemGameModes key={index} gameMode={gameMode} sport={selectedSport} />
        ))}
      </BoxRow>
    </Box>
  );
}
