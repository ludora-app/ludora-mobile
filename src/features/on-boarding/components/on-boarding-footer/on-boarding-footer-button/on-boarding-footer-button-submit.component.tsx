import { Button } from '@ludo/ui'
import { useTransition } from 'react'
import { useTranslate } from '@tolgee/react'

import { useOnBoardingStore } from '../../../stores/on-boarding.store'
import { useCreateSportPreference } from '../../../queries/create-sport-preference.query'
import { useCreateGameModePreference } from '../../../queries/create-game-mode-preference.query'

export default function OnBoardingFooterButtonSubmit() {
  const sportPreferences = useOnBoardingStore(state => state.sportPreferences)

  console.log("sportPreferences", sportPreferences)
  const { mutateAsync: createGameModePreference } = useCreateGameModePreference()
  const { mutateAsync: createSportPreference } = useCreateSportPreference()
  const [isPending, startTransition] = useTransition()
  const { t } = useTranslate()
  const handleSubmit = async () => {
    try {
      startTransition(async () => {
        await Promise.all(
          sportPreferences.map(sportPreference => {
            createSportPreference({ level: sportPreference.level, sport: sportPreference.sport });
            sportPreference.gameModes.map(gameMode => (
              createGameModePreference({ gameMode, sport: sportPreference.sport })
            ))
          })
        )
      })
    } catch (error) {
      console.log("error", error)
    }
  }
  return (
    <Button title={t('common.finish')} onPress={handleSubmit} colorVariant="primary" isLoading={isPending} />
  )
}