import { useEffect } from 'react'
import { useToast } from '@chillui/ui'
import { useForm } from 'react-hook-form'
import { useTranslate } from '@tolgee/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Box, BoxRow, Button, FormInput, Icon, String, WrapperGestureHandlerScrollView } from '@ludo/ui'

import COLORS from '@/constants/COLORS'
import ROUTES from '@/constants/routes.constants'
import { ErrorResponse } from '@/api/orval.instance'
import { useAnalytics } from '@/hooks/analytics-trackers.hook'
import { RootStackParamList } from '@/types/routes-params.types'
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants'
import FormSheetFooter from '@/components/ui/form-sheet/components/form-sheet-footer.component'
import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component'

import { useAddField } from '../../queries/add-field.query'
import { CreateFieldSchema, createFieldSchema } from '../../schemas/create-field.schema'
import CreateFieldImages from '../../components/create-field/create-field-images.component'
import CreateFieldAddress from '../../components/create-field/create-field-address.component'

type LocalSearchParams = RootStackParamList[typeof ROUTES.CREATE_SESSION.STEP_2_CREATE_FIELD_FORM_SHEET]

export default function CreateFieldFormSheet() {
  const { sport } =
    useLocalSearchParams<LocalSearchParams>()
  const { t } = useTranslate()
  const router = useRouter()
  const { toast } = useToast()
  const { trackError, trackEvent } = useAnalytics()
  const { isPending, mutateAsync: createField } = useAddField()

  const { control, handleSubmit, setValue } = useForm<CreateFieldSchema>({
    mode: 'onChange',
    resolver: zodResolver(createFieldSchema),
  })

  useEffect(() => {
    if (!sport) return
    setValue('sports', [sport])
  }, [sport, setValue])


  const onSubmit = async (data: CreateFieldSchema) => {
    try {

      const images = data.images.map((image) => ({
        file: image.file,
        name: image.name,
        order: image.order,
      })) as unknown as Blob[];
      await createField({
        address: data.address,
        images,
        lat: data.lat,
        lng: data.lng,
        name: data.name,
        shortAddress: data.shortAddress,
        sports: data.sports,
      })
      trackEvent({
        data: { sport: data.sports[0] },
        eventName: ANALYTICS_EVENTS.CREATE_SESSION.CREATE_FIELD_SUCCESS,
      })
      toast({
        message: t('create-session.create-field.success', 'Terrain ajouté avec succès'),
        variant: 'success',
      })
      router.back()
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      trackEvent({
        data: { error_message: errorResponse.api_error_detail },
        eventName: ANALYTICS_EVENTS.CREATE_SESSION.CREATE_FIELD_FAILED,
      })
      trackError({ error })
    }
  }

  return (
    <Box collapsable={false} className="flex-1">
      <FormSheetHeader title={t('create-session.create-field.title')} />
      <WrapperGestureHandlerScrollView contentContainerClassName="gap-5 pb-8">
        <Box className="mt-4 gap-5">
          <FormInput
            control={control}
            name="name"
            placeholder={t('create-session.create-field.name_placeholder')}
            label={t('create-session.create-field.name_label')}
          />
          <CreateFieldAddress
            control={control}
            name="address"
          />

          <CreateFieldImages control={control} name="images" />

          <BoxRow className="bg-primary/10 items-center gap-3 rounded-lg p-3">
            <Icon name="warning-solid" size="md" color={COLORS.primary} />
            <String className="flex-1" variant="body-sm">
              {t('create-session.create-field.validation_notice')}
            </String>
          </BoxRow>
        </Box>
      </WrapperGestureHandlerScrollView>
      <FormSheetFooter hasBottomSafeArea>
        <Button
          title={t('common.add')}
          size="md"
          onPress={handleSubmit(onSubmit)}
          isLoading={isPending}
        />
        <Button
          title={t('common.button_cancel')}
          variant="outlined"
          size="md"
          onPress={() => router.back()}
        />
      </FormSheetFooter>
    </Box>
  )
}
