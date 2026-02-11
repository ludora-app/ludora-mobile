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
import { ProfilEditEmailSchema, profilEditEmailSchema } from '../schemas/profil-edit-email.schema'



export default function ProfilEditEmailFormsheet() {
  const router = useRouter()
  const { userMe } = useUserMe()
  const { email: userMeEmail } = userMe || {}
  const { isPending: isUpdatingUserMe, mutateAsync: updateUserMe } = useUpdateUserMe()
  const { t } = useTranslate()
  const { trackError, trackEvent } = useAnalytics()
  const { control, handleSubmit } = useForm(
    {
      defaultValues: {
        email: userMeEmail,
      },
      resolver: zodResolver(profilEditEmailSchema)
    }
  )

  const onSubmit = async (data: ProfilEditEmailSchema) => {
    try {
      await updateUserMe()
      trackEvent({ eventName: "profil_edit_email_success" })
      router.back()
    } catch (error) {
      trackError({ error })
      trackEvent({ data: { error_message: error.message }, eventName: "profil_edit_email_failed" })
    }
  }

  return (
    <>
      <FormSheetHeader title={t('profil.profil-edit.email_title_edit')} />
      <Wrapper fill={false} className='pt-5 pb-20 gap-2'>
        <FormInput control={control} name="email" placeholder={t('common.input_email_placeholder')} label={t('common.input_email_label')} />
      </Wrapper>
      <ProfilEditFooter handleSubmit={handleSubmit(onSubmit)} isLoading={isUpdatingUserMe} />
    </>
  )
}