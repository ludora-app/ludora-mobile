import { useTranslate } from '@tolgee/react';
import { Image, Box, BoxRow, String, WrapperScrollView } from '@ludo/ui';

import { formatDate } from '@/utils/time.utils';
import { getSportImage } from '@/utils/sports.utils';
import { useGetField } from '@/queries/get-field.query';
import Loading from '@/components/ui/loading/loading.component';
import FieldCard from '@/components/ui/field-card/components/field-card.component';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';
import FieldCardSkeleton from '@/components/ui/field-card/components/field-card-skeleton.component';

import CreateSessionTitle from '../components/create-session-title-component';

export default function CreateSessionStep4Screen() {
  const { t } = useTranslate();
  const { session } = useCreateSessionStore();
  const { endDate, fieldUid, gameMode, level, sport, startDate, visibility } = session || {};
  const { data: fieldData, isLoading } = useGetField(fieldUid ?? '');

  if (!fieldUid || !sport) {
    return <Loading />;
  }

  const sessionImage = getSportImage(sport);

  return (
    <WrapperScrollView className="pb-10">
      <CreateSessionTitle title={t('create-session-steps.step-4.title')} />
      <Box className="gap-9">
        <Box>
          <String className="mb-3" font="primaryBold">
            {t('create-session-steps.step-4.session_details_title')}
          </String>

          <BoxRow className="items-center gap-5 rounded-2xl border border-ring bg-white px-5 py-3">
            <Box className="items-center gap-2">
              <Image source={sessionImage} className="size-8" />
              <String font="primaryBold">{t(`common.game_mode_${gameMode}`, { space: ' ' })}</String>
            </Box>
            <Box className="flex-1">
              <BoxRow>
                <String font="primaryBold">{t('common.date')} : </String>
                <String colorVariant="primary" font="primaryBold">
                  {formatDate({ date: startDate ?? '', format: 'dddd DD MMMM YYYY' })}
                </String>
              </BoxRow>
              <BoxRow>
                <String font="primaryBold">{t('create-session-steps.step-4.level_searched')} : </String>
                <String colorVariant="primary" font="primaryBold">
                  {t(`common.session_level_${level}`)}
                </String>
              </BoxRow>
              <BoxRow>
                <String useFastText={false} font="primaryBold">
                  {t('common.hour')} :{' '}
                  <String useFastText={false} colorVariant="primary" font="primaryBold">
                    {formatDate({ date: startDate ?? '', format: 'HH[h]mm' })}
                  </String>{' '}
                  {t('common.to')}{' '}
                  <String useFastText={false} colorVariant="primary" font="primaryBold">
                    {formatDate({ date: endDate ?? '', format: 'HH[h]mm' })}
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
            {t('create-session-steps.step-4.field_chosen_title')}
          </String>
          {isLoading && <FieldCardSkeleton />}
          {!isLoading && fieldData && (
            <FieldCard field={fieldData} sportImage={sport ?? undefined} showType showSport />
          )}
        </Box>
      </Box>
    </WrapperScrollView>
  );
}
