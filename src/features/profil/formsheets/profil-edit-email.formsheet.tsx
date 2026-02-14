import { useToast } from '@chillui/ui'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { useTranslate } from '@tolgee/react'
import { FormInput, Wrapper } from '@ludo/ui'
import { zodResolver } from '@hookform/resolvers/zod'

import { useUserMe } from '@/queries/user-me.query'
import { ErrorResponse } from '@/api/orval.instance'
import { useAnalytics } from '@/hooks/analytics-trackers.hook'
import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component'

import { useUpdateUserMeEmail } from '../queries/update-user-me-email.query'
import ProfilEditFooter from '../components/profil-edit/profil-edit-footer.component'
import { ProfilEditEmailSchema, profilEditEmailSchema } from '../schemas/profil-edit-email.schema'


const EMAIL_ALREADY_EXISTS_ERROR_MESSAGE = 'Email already exists';

export default function ProfilEditEmailFormsheet() {
  const router = useRouter()
  const { toast } = useToast()
  const { userMe } = useUserMe()
  const { email: userMeEmail } = userMe || {}
  const { isPending: isUpdatingUserMeEmail, mutateAsync: updateUserMeEmail } = useUpdateUserMeEmail()
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
      if (data.email === userMeEmail) {
        router.back()
        return
      }
      await updateUserMeEmail({ email: data.email })
      toast({
        message: t('profil.profil-edit.email_updated_success'),
        variant: "success",
      })
      trackEvent({ eventName: "profil_edit_email_success" })
      router.back()
    } catch (error) {
      const errorResponse = error as ErrorResponse
      if (errorResponse.api_error_detail === EMAIL_ALREADY_EXISTS_ERROR_MESSAGE) {
        toast({
          message: t('auth.register.email_already_exists'),
          variant: 'error',
        });
        return
      }
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
      <ProfilEditFooter handleSubmit={handleSubmit(onSubmit)} isLoading={isUpdatingUserMeEmail} />
    </>
  )
}