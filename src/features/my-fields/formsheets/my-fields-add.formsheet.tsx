import { useToast } from '@chillui/ui';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BoxRow, Button, FormInput, Icon, String, WrapperGestureHandlerScrollView } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { ErrorResponse } from '@/api/orval.instance';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { RootStackParamList } from '@/types/routes-params.types';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';
import FormSheetFooter from '@/components/ui/form-sheet/components/form-sheet-footer.component';
import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component';

import { useAddField } from '../queries/add-field.query';
import AddFieldImages from '../components/add-field/add-field-images.component';
import AddFieldAddress from '../components/add-field/add-field-address.component';
import { CreateFieldSchema, createFieldSchema } from '../schemas/create-field.schema';
import AddFieldSportSelector from '../components/add-field/add-field-sport-selector.component';

type LocalSearchParams = RootStackParamList[typeof ROUTES.MY_FIELDS.ADD];

export default function MyFieldsAddFormSheet() {
  const router = useRouter();
  const { t } = useTranslate();
  const { toast } = useToast();
  const { trackError, trackEvent } = useAnalytics();
  const { sport } = useLocalSearchParams<LocalSearchParams>();

  const [showSportSelector] = useState(() => !sport);

  const { control, handleSubmit, setValue, watch } = useForm<CreateFieldSchema>({
    defaultValues: {
      address: '',
      images: [],
      name: '',
      shortAddress: '',
      sports: [],
    },
    mode: 'onChange',
    resolver: zodResolver(createFieldSchema),
  });
  const { isPending: isAddingField, mutateAsync: createField } = useAddField();

  useEffect(() => {
    if (!sport) return;
    setValue('sports', [sport]);
  }, [sport, setValue]);

  const sports = watch('sports');

  const onSubmit = async (data: CreateFieldSchema) => {
    try {
      const images = data.images.map(image => ({
        name: image.name,
        order: image.order,
        type: image.type,
        uri: image.uri,
      })) as unknown as Blob[];

      await createField({
        address: data.address,
        images,
        lat: data.lat,
        lng: data.lng,
        name: data.name,
        shortAddress: data.shortAddress,
        sports: data.sports,
      });
      trackEvent({
        data: { sport: data.sports[0] },
        eventName: ANALYTICS_EVENTS.MY_FIELDS.ADD_FIELD_SUCCESS,
      });
      toast({
        message: t('create-session.create-field.success', 'Terrain ajouté avec succès'),
        variant: 'success',
      });
      router.back();
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      const addressAlreadyExists = errorResponse.api_error_status === 409;

      if (addressAlreadyExists) {
        toast({
          message: t('create-session.create-field.error_address_already_exists'),
          variant: 'error',
        });
      }
      trackEvent({
        data: { error_message: errorResponse?.api_error_detail ?? 'Unknown error' },
        eventName: ANALYTICS_EVENTS.MY_FIELDS.ADD_FIELD_FAILED,
      });
      if (!addressAlreadyExists) {
        trackError({ error });
      }
    }
  };

  return (
    <>
      <FormSheetHeader title={t('my-fields.add.title')} hasGoBack />
      <WrapperGestureHandlerScrollView fill={false} contentContainerClassName="gap-5 py-5">
        {showSportSelector && <AddFieldSportSelector setValue={setValue} selectedSports={sports} />}
        <FormInput
          control={control}
          name="name"
          placeholder={t('create-session.create-field.name_placeholder')}
          label={t('create-session.create-field.name_label')}
          hasErrorTranslation
        />
        <AddFieldAddress control={control} name="address" goBackPath={ROUTES.MY_FIELDS.ADD} />
        <AddFieldImages control={control} name="images" />
        <BoxRow className="items-center gap-3 rounded-lg bg-primary/10 p-3">
          <Icon name="warning-solid" size="md" color={COLORS.primary} />
          <String className="flex-1" variant="body-sm">
            {t('create-session.create-field.validation_notice')}
          </String>
        </BoxRow>
      </WrapperGestureHandlerScrollView>
      <FormSheetFooter hasBottomSafeArea>
        <Button title={t('common.add')} onPress={handleSubmit(onSubmit)} isLoading={isAddingField} size="md" />
        <Button title={t('common.button_cancel')} variant="outlined" onPress={router.back} size="md" />
      </FormSheetFooter>
    </>
  );
}
