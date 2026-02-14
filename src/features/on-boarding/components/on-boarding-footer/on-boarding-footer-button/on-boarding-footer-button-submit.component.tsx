import { Button } from '@ludo/ui'
import { useTransition } from 'react'
import { useTranslate } from '@tolgee/react'

import { useOnBoardingStore } from '../../../stores/on-boarding.store'
import { useCreateSportPreference } from '../../../queries/create-sport-preference.query'


export default function OnBoardingFooterButtonSubmit() {
  const sportPreferences = useOnBoardingStore(state => state.sportPreferences)

  const { mutateAsync: createSportPreference } = useCreateSportPreference()
  const [isPending, startTransition] = useTransition()
  const { t } = useTranslate()
  const handleSubmit = async () => {
    try {
    } catch (error) {
      console.log("error", error)
    }
  }
  return (
    <Button title={t('common.finish')} onPress={handleSubmit} colorVariant="primary" isLoading={isPending} />
  )
}