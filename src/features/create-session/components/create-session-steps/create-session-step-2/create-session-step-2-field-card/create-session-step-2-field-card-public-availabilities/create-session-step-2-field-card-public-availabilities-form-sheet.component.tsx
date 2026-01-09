import { z } from 'zod';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Box, BoxRow, BoxRowBetween, Icon, String, Button, FormInput, WrapperGestureHandlerScrollView } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { SessionCollectionItemDtoSport } from '@/api/generated/model';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';
import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component';
import FormSheetFooter from '@/components/ui/form-sheet/components/form-sheet-footer.component';

const durationSchema = z.object({
  duration: z.string().min(1, 'La durée est requise').regex(/^\d+$/, 'Doit être un nombre'),
});

type DurationFormData = z.infer<typeof durationSchema>;

type LocalSearchParamsProps = {
  fieldUid: string;
  slotUid: string;
  startDate: string;
  sport: SessionCollectionItemDtoSport;
};

export default function CreateSessionStep2FieldCardPublicAvailabilitiesFormSheet() {
  const { fieldUid, slotUid, sport, startDate } = useLocalSearchParams<LocalSearchParamsProps>();

  const { t } = useTranslate();
  const router = useRouter();
  const setCreateSession = useCreateSessionStore(state => state.setSession);

  const { control, handleSubmit, watch } = useForm<DurationFormData>({
    resolver: zodResolver(durationSchema),
  });

  const duration = watch('duration');

  const formattedDate = startDate ? dayjs(startDate).format('dddd DD MMM YYYY') : '-';
  const formattedStartTime = dayjs(startDate).format('HH:mm') || '-';
  const durationNumber = parseInt(duration, 10);
  const formattedEndDate = dayjs(startDate).add(durationNumber, 'minute');

  const formattedEndTime = () => {
    if (durationNumber && durationNumber > 0) {
      return formattedEndDate.format('HH:mm');
    }
    return '-';
  };

  const handleConfirm = () => {
    setCreateSession({
      additionalData: {
        fieldType: 'public',
        price: null,
        pricePerPlayer: null,
        publicFieldSlotUid: slotUid,
        sport,
      },
      endDate: formattedEndDate.toISOString(),
      fieldUid,
      slotUid: null,
      startDate,
    });
    router.back();
  };

  return (
    <Box className="flex)1" collapsable={false}>
      <FormSheetHeader />
      <WrapperGestureHandlerScrollView keyboardDismissMode="on-drag" keyboardShouldPersistTaps="handled">
        <Box className="mt-6 gap-3">
          <String font="primaryBold" variant="body-1" colorVariant="primary">
            {t('create-session-step-2.public-availabilities-form-sheet.input_label')}
          </String>
          <FormInput
            name="duration"
            control={control}
            placeholder={t('create-session-step-2.public-availabilities-form-sheet.input_placeholder')}
            keyboardType="number-pad"
            allow="numbers"
            autoFocus
          />
        </Box>

        <String font="primaryBold" variant="body-3" className="mb-3 mt-8 text-center">
          {t('create-session-step-2.public-availabilities-form-sheet.warning_title')}
        </String>

        <BoxRow className="mb-6 items-center gap-3 rounded-lg bg-primary/10 p-3">
          <Icon name="warning-solid" size="md" color={COLORS.primary} />
          <String className="flex-1">
            {t('create-session-step-2.public-availabilities-form-sheet.warning_description')}
          </String>
        </BoxRow>

        <Box className="gap-4">
          <String colorVariant="primary" font="primaryBold">
            {t('create-session-step-2.public-availabilities-form-sheet.match_details')}
          </String>

          <BoxRowBetween className="border-b border-ring pb-3">
            <String font="primaryBold">{t('common.date')}</String>
            <String font="primaryBold">{formattedDate}</String>
          </BoxRowBetween>

          <BoxRowBetween>
            <String font="primaryBold">{t('common.start_date')}</String>
            <String font="primaryBold">{formattedStartTime}</String>
          </BoxRowBetween>
          <BoxRowBetween>
            <String font="primaryBold">{t('common.end_date')}</String>
            <String font="primaryBold">{formattedEndTime()}</String>
          </BoxRowBetween>
        </Box>
      </WrapperGestureHandlerScrollView>
      <FormSheetFooter>
        <Button title={t('common.button_cancel')} variant="outlined" size="md" onPress={() => router.back()} />
        <Button title={t('common.button_confirm')} size="md" onPress={handleSubmit(handleConfirm)} />
      </FormSheetFooter>
    </Box>
  );
}
