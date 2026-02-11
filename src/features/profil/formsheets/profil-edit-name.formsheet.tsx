import { z } from 'zod'
import { useToast } from '@chillui/ui'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { useTranslate } from '@tolgee/react'
import { FormInput, Wrapper } from '@ludo/ui'
import { zodResolver } from '@hookform/resolvers/zod'

import { useUserMe } from '@/queries/user-me.query'
import { useAnalytics } from '@/hooks/analytics-trackers.hook'
import { useUpdateUserMe } from '@/queries/update-user-me.query'
import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component'

import ProfilEditFooter from '../components/profil-edit/profil-edit-footer.component'
import { profilEditNameSchema } from '../schemas/profil-edit-name.schema'



export default function ProfilEditNameFormsheet() {
  const { toast } = useToast()
  const router = useRouter()
  const { userMe } = useUserMe()
  const { isPending: isUpdatingUserMe, mutateAsync: updateUserMe } = useUpdateUserMe()
  const { t } = useTranslate()
  const { trackError, trackEvent } = useAnalytics()
  const schema = profilEditNameSchema(t)
  const { control, handleSubmit } = useForm(
    {
      defaultValues: {
        firstname: userMe?.firstname,
        lastname: userMe?.lastname,
      },
      mode: 'onChange',
      resolver: zodResolver(schema)
    }
  )

  const onSubmit = async (data: z.infer<typeof schema>) => {
    if (data.firstname === userMe?.firstname && data.lastname === userMe?.lastname) {
      router.back()
      return;
    }
    try {
      await updateUserMe(data)
      const isFirstnameChanged = data.firstname !== userMe?.firstname
      const isLastnameChanged = data.lastname !== userMe?.lastname
      trackEvent({ data: { is_firstname_changed: !!isFirstnameChanged, is_lastname_changed: !!isLastnameChanged }, eventName: "profil_edit_name_success" })
      if (isFirstnameChanged && isLastnameChanged) {
        toast({
          message: t('profil.profil-edit.name_updated_success'),
          variant: "success",
        })
      } else if (isFirstnameChanged) {
        toast({
          message: t('profil.profil-edit.firstname_updated_success'),
          variant: "success",
        })
      } else if (isLastnameChanged) {
        toast({
          message: t('profil.profil-edit.lastname_updated_success'),
          variant: "success",
        })
      }
      router.back()
    } catch (error) {
      trackError({ error })
      trackEvent({ data: { error_message: error.message }, eventName: "profil_edit_name_failed" })
    }
  }

  return (
    <>
      <FormSheetHeader title={t('profil.profil-edit.name_title')} />
      <Wrapper fill={false} className='pt-5 pb-20 gap-2'>
        <FormInput control={control} name="lastname" placeholder={t('common.input_lastname_placeholder')} label={t('common.input_lastname_label')} />
        <FormInput control={control} name="firstname" placeholder={t('common.input_firstname_placeholder')} label={t('common.input_firstname_label')} />
      </Wrapper>
      <ProfilEditFooter handleSubmit={handleSubmit(onSubmit)} isLoading={isUpdatingUserMe} />
    </>
  )
}