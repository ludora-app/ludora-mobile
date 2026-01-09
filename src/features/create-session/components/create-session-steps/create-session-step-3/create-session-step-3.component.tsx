import { Image } from 'expo-image';
import { useTranslate } from '@tolgee/react';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Box, BoxRow, String, WrapperScrollView } from '@ludo/ui';

import { formatDate } from '@/utils/date.utils';
import { getSportImage } from '@/utils/sports.utils';
import { SESSION_LEVELS } from '@/constants/session.constants';
import { useGetField } from '@/features/create-session/queries/get-field.query';
import FieldCard from '@/components/ui/field-card/components/field-card.component';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';
import FieldCardSkeleton from '@/components/ui/field-card/components/field-card-skeleton.component';

import CreateSessionTitle from '../../create-session-title-component';

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function CreateSessionStep3() {
  const { t } = useTranslate();
  const { session } = useCreateSessionStore();
  const { additionalData, endDate, fieldUid, gameMode, level, startDate, visibility } = session || {};
  const { sport } = additionalData || {};
  const { data: fieldData, isLoading } = useGetField(fieldUid);

  const sessionImage = getSportImage(sport);

  return (
    <AnimatedBox entering={FadeInRight} className="flex-1">
      <WrapperScrollView className="pb-10">
        <CreateSessionTitle title={t('create-session-steps.step-3.title')} />
        <Box className="gap-9">
          <Box>
            <String className="mb-3" font="primaryBold">
              {t('create-session-steps.step-3.session_details_title')}
            </String>

            <BoxRow className="items-center gap-10 rounded-2xl border border-ring bg-white px-8 py-3">
              <Box className="items-center gap-2">
                <Image source={sessionImage} className="size-10" />
                <String font="primaryBold">{t(`common.game_mode_${gameMode}`, { space: ' ' })}</String>
              </Box>
              <Box>
                <BoxRow>
                  <String font="primaryBold">{t('common.date')} : </String>
                  <String colorVariant="primary" font="primaryBold">
                    {formatDate({ date: startDate, format: 'dddd DD MMMM YYYY' })}
                  </String>
                </BoxRow>
                <BoxRow>
                  <String font="primaryBold">{t('create-session-steps.step-3.level_searched')} : </String>
                  <String colorVariant="primary" font="primaryBold">
                    {t(`common.session_level_${SESSION_LEVELS[level]?.name}`)}
                  </String>
                </BoxRow>
                <BoxRow>
                  <String useFastText={false} font="primaryBold">
                    {t('common.hour')} :{' '}
                    <String useFastText={false} colorVariant="primary" font="primaryBold">
                      {formatDate({ date: startDate, format: 'HH[h]mm' })}
                    </String>{' '}
                    {t('common.to')}{' '}
                    <String useFastText={false} colorVariant="primary" font="primaryBold">
                      {formatDate({ date: endDate, format: 'HH[h]mm' })}
                    </String>
                  </String>
                </BoxRow>

                <BoxRow>
                  <String font="primaryBold">{t('common.sport')} : </String>
                  <String colorVariant="primary" font="primaryBold">
                    {t(`common.session_sport_${sport}`)}
                  </String>
                </BoxRow>
                <BoxRow className="items-center">
                  <String font="primaryBold">Visibilité : </String>
                  <String colorVariant="primary" font="primaryBold">
                    {t(`common.session_visibility_${visibility}`)}{' '}
                  </String>
                  <String colorVariant="primary" font="primaryRegular" className="text-[10px]">
                    ({t(`common.session_visibility_description_${visibility}`)})
                  </String>
                </BoxRow>
              </Box>
            </BoxRow>
          </Box>
          <Box>
            <String className="mb-3" font="primaryBold">
              {t('create-session-steps.step-3.field_chosen_title')}
            </String>
            {isLoading ? <FieldCardSkeleton /> : <FieldCard field={fieldData} />}
          </Box>
        </Box>
      </WrapperScrollView>
    </AnimatedBox>
  );
}
