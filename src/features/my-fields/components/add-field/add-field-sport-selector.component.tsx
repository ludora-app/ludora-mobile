import { useTranslate } from '@tolgee/react'
import { Box, Button, String } from '@ludo/ui'

import type { SportItem } from '@/types/sports.types'

import { cn } from '@/components/chill-ui-library'
import { getSportImage } from '@/utils/sports.utils'
import { useGetSports } from '@/queries/get-sports.query'

import type { CreateFieldSchema } from '../../schemas/create-field.schema'

type AddFieldSportSelectorProps = {
  selectedSports: CreateFieldSchema['sports']
  setValue: import('react-hook-form').UseFormSetValue<CreateFieldSchema>
}

function AddFieldSportSelectorItem(props: {
  onPress: () => void
  selected: boolean
  sport: SportItem
}) {
  const { onPress, selected, sport } = props
  const { t } = useTranslate()
  const sportImage = getSportImage(sport.code)

  return (
    <Button
      size="xl"
      title={t(`common.session_sport_${sport.code}`)}
      image={{ className: 'size-6', contentFit: 'contain', source: sportImage }}
      contentProps={{
        className: 'gap-2',
        position: 'left',
      }}
      variant="outlined"
      colorVariant={selected ? 'primary' : 'dark'}
      className={cn('w-[48%] rounded-xl bg-white')}
      onPress={onPress}
    />
  )
}

export default function AddFieldSportSelector(props: AddFieldSportSelectorProps) {
  const { selectedSports, setValue } = props
  const { t } = useTranslate()
  const { sports } = useGetSports()

  return (
    <Box>
      <String size="sm" className="mb-3 text-black/60">
        {t('create-session-steps.step_1.select_sport')}
      </String>
      <Box className="flex flex-row flex-wrap gap-3">
        {sports.map(sport => (
          <AddFieldSportSelectorItem
            key={sport.code}
            sport={sport}
            selected={selectedSports?.length === 1 && selectedSports[0] === sport.code}
            onPress={() => setValue('sports', [sport.code])}
          />
        ))}
      </Box>
    </Box>
  )
}
