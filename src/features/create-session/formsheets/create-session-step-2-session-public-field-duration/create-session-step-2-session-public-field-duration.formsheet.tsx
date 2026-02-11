import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Box,
  BoxRow,
  BoxRowBetween,
  Icon,
  String,
  Button,
  WrapperGestureHandlerScrollView,
  NumericInput,
  BoxCenter,
} from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import ROUTES from '@/constants/routes.constants';
import { RootStackParamList } from '@/types/routes-params.types';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';
import FormSheetFooter from '@/components/ui/form-sheet/components/form-sheet-footer.component';
import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component';

import { CREATE_SESSION } from '../../constants/create-session.constants';
import {
  CreateSessionStep2SessionPublicFieldDurationFormSchema,
  createSessionStep2SessionPublicFieldDurationFormSchema,
} from '../../schemas/create-session-step-2-session-public-field-duration.schema';

export default function CreateSessionStep2SessionPublicFieldDurationFormSheet() {
  const { endDate, fieldUid, slotUid, sport, startDate } =
    useLocalSearchParams<RootStackParamList[typeof ROUTES.CREATE_SESSION.STEP_2_DURATION_FORM_SHEET]>();

  const { t } = useTranslate();
  const router = useRouter();
  const setCreateSession = useCreateSessionStore(state => state.setSession);

  const calculateDurationFromDates = () => {
    if (endDate && startDate) {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      const durationMinutes = end.diff(start, 'minute');
      return durationMinutes.toString();
    }
    return CREATE_SESSION.DEFAULT_DURATION;
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<CreateSessionStep2SessionPublicFieldDurationFormSchema>({
    defaultValues: {
      duration: calculateDurationFromDates(),
    },
    mode: 'onChange',
    resolver: zodResolver(createSessionStep2SessionPublicFieldDurationFormSchema(t, startDate)),
  });

  const duration = watch('duration');

  const num = parseInt(duration, 10);
  const isValidDuration =
    !Number.isNaN(num) && num >= CREATE_SESSION.MIN_DURATION && num <= CREATE_SESSION.MAX_DURATION;

  const startDayjs = dayjs(startDate);
  const isStartValid = startDayjs.isValid();

  const matchDetails = {
    date: isStartValid ? startDayjs.format('dddd DD MMM YYYY') : '-',
    end: isStartValid && !errors.duration ? startDayjs.add(num, 'minute').format('HH:mm') : '-',
    endIso: isStartValid && isValidDuration ? startDayjs.add(num, 'minute').toISOString() : null,
    start: isStartValid ? startDayjs.format('HH:mm') : '-',
  };

  const handleConfirm = () => {
    setCreateSession({
      additionalData: {
        autoGoToNextStep: true,
        fieldType: 'public',
        price: null,
        pricePerPlayer: null,
        publicFieldSlotUid: slotUid,
        sport,
      },
      endDate: matchDetails.endIso,
      fieldUid,
      slotUid: null,
      startDate,
    });
    router.back();
  };

  return (
    <Box collapsable={false}>
      <FormSheetHeader />
      <WrapperGestureHandlerScrollView contentContainerClassName="gap-3 mb-8">
        <Box className="mt-4 gap-3">
          <String font="primaryBold" variant="body-1" colorVariant="primary">
            {t('create-session-step-2.public-availabilities-form-sheet.input_label')}
          </String>
          <BoxCenter>
            <NumericInput
              control={control}
              name="duration"
              step={CREATE_SESSION.NUMERIC_INPUT_STEP}
              min={CREATE_SESSION.MIN_DURATION}
              max={CREATE_SESSION.MAX_DURATION}
              size="xl"
              inputProps={{
                rightContentProps: {
                  className: 'text-muted',
                  content: 'min',
                },
              }}
            />
          </BoxCenter>
        </Box>

        <String font="primaryBold" variant="body-3" className="mt-4 mb-3 text-center">
          {t('create-session-step-2.public-availabilities-form-sheet.warning_title')}
        </String>

        <BoxRow className="bg-primary/10 mb-6 items-center gap-3 rounded-lg p-3">
          <Icon name="warning-solid" size="md" color={COLORS.primary} />
          <String className="flex-1">
            {t('create-session-step-2.public-availabilities-form-sheet.warning_description')}
          </String>
        </BoxRow>

        <Box className="gap-4">
          <String colorVariant="primary" font="primaryBold">
            {t('create-session-step-2.public-availabilities-form-sheet.match_details')}
          </String>

          <BoxRowBetween className="border-ring border-b pb-3">
            <String font="primaryBold">{t('common.date')}</String>
            <String font="primaryBold">{matchDetails.date}</String>
          </BoxRowBetween>

          <BoxRowBetween>
            <String font="primaryBold">{t('common.start_date')}</String>
            <String font="primaryBold">{matchDetails.start}</String>
          </BoxRowBetween>
          <BoxRowBetween>
            <String font="primaryBold">{t('common.end_date')}</String>
            <String font="primaryBold">{matchDetails.end}</String>
          </BoxRowBetween>
        </Box>
      </WrapperGestureHandlerScrollView>
      <FormSheetFooter>
        <Button title={t('common.button_cancel')} variant="outlined" size="md" onPress={() => router.back()} />
        <Button
          title={t('create-session-step-2.public-availabilities-form-sheet.button_confirm')}
          size="md"
          onPress={handleSubmit(handleConfirm)}
        />
      </FormSheetFooter>
    </Box>
  );
}
