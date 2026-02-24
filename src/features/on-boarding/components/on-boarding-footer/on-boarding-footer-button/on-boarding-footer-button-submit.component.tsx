import { Button } from '@ludo/ui'
import { useTranslate } from '@tolgee/react'

import { ErrorResponse } from '@/api/orval.instance'
import { useAnalytics } from '@/hooks/analytics-trackers.hook'
import { useUpdateUserMe } from '@/queries/update-user-me.query'
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants'

import { useOnBoardingStore } from '../../../stores/on-boarding.store'
import { useCreateSportPreference } from '../../../queries/create-sport-preference.query'


export default function OnBoardingFooterButtonSubmit() {
  const { t } = useTranslate()
  const { trackError, trackEvent } = useAnalytics()
  const sportPreferences = useOnBoardingStore(state => state.sportPreferences)
  const profilePicture = useOnBoardingStore(state => state.profilePicture);

  const { isPending: isCreatingSportPreference, mutateAsync: createSportPreference } = useCreateSportPreference()
  const { isPending: isUpdatingUserMe, mutateAsync: updateUserMe } = useUpdateUserMe()



  const handleSubmit = async () => {
    try {
      if (sportPreferences && sportPreferences.length > 0) {
        await createSportPreference({ sportPreferences })
      }
      if (profilePicture) {
        const file = {
          name: profilePicture.fileName ?? 'avatar.jpg',
          type: profilePicture.mimeType ?? 'image/jpeg',
          uri: profilePicture.uri,
        } as unknown as Blob;
        await updateUserMe({ file, onBoardingStatus: "COMPLETE" })
      } else {
        await updateUserMe({ onBoardingStatus: "COMPLETE" })
      }
      trackEvent({
        data: {
          has_profile_picture: !!profilePicture,
          has_sport_preferences: !!sportPreferences && sportPreferences.length > 0,
        },
        eventName: ANALYTICS_EVENTS.ONBOARDING.ONBOARDING_COMPLETED,
      })
    } catch (error) {
      const errorResponse = error as ErrorResponse
      trackEvent({
        data: { error_message: errorResponse.api_error_detail },
        eventName: ANALYTICS_EVENTS.ONBOARDING.ONBOARDING_FAILED,
      })
      trackError({ error })
    }
  }
  const isPending = isCreatingSportPreference || isUpdatingUserMe
  return (
    <Button title={t('common.finish')} onPress={handleSubmit} colorVariant="primary" isLoading={isPending} />
  )
}