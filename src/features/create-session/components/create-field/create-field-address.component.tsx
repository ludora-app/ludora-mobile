import { useEffect } from 'react'
import { Pressable } from 'react-native'
import { useTranslate } from '@tolgee/react'
import { Box, Icon, String } from '@ludo/ui'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useController, UseControllerProps } from 'react-hook-form'

import COLORS from '@/constants/colors.contstants'
import { parse } from '@/utils/json.utils'
import ROUTES from '@/constants/routes.constants'
import { Place } from '@/components/chill-ui-library/types/placesInput.types'
import { ReturnStackParamList, RootStackParamList } from '@/types/routes-params.types'

import { CreateFieldSchema } from '../../schemas/create-field.schema'



type ReturnLocalSearchParams = ReturnStackParamList[typeof ROUTES.FILTERS.FILTER_ADDRESSES]
type LocalSearchParams = RootStackParamList[typeof ROUTES.FILTERS.FILTER_ADDRESSES]



type CreateFieldAddressProps = UseControllerProps<CreateFieldSchema>

export default function CreateFieldAddress(props: CreateFieldAddressProps) {
  const { control, name } = props
  const { t } = useTranslate()
  const router = useRouter()
  const { field: { onChange: onChangeAddress }, fieldState: { error } } = useController({ control, name })
  const { field: { onChange: onChangeShortAddress, value: shortAddressValue } } = useController({ control, name: 'shortAddress' })
  const { field: { onChange: onChangeLat } } = useController({ control, name: 'lat' })
  const { field: { onChange: onChangeLng } } = useController({ control, name: 'lng' })

  const { address: addressParam } = useLocalSearchParams<ReturnLocalSearchParams>()


  useEffect(() => {
    if (!addressParam) return
    try {
      const place = parse(addressParam) as Place
      const address = place.formattedAddress
      onChangeAddress(address)
      onChangeShortAddress(place.shortFormattedAddress)
      onChangeLat(place.location.latitude)
      onChangeLng(place.location.longitude)
    } catch {
      // invalid JSON
    }
    router.setParams({ address: undefined })
  }, [addressParam, onChangeAddress, onChangeShortAddress, onChangeLat, onChangeLng, router])

  const handleOpenAddressPicker = () => {
    const params: LocalSearchParams = { goBackPath: ROUTES.CREATE_SESSION.STEP_2_CREATE_FIELD_FORM_SHEET, showNearMe: 'false' }
    router.navigate({
      params,
      pathname: ROUTES.FILTERS.FILTER_ADDRESSES,
    })
  }

  return (
    <Box>
      <String variant="body-sm">
        {t('create-session.create-field.address_label')}
      </String>
      <Pressable
        onPress={handleOpenAddressPicker}
        className={`flex-row items-center rounded-lg border bg-white px-3 py-3 ${error ? 'border-red-500' : 'border-input'}`}
      >
        <Icon name="location-regular" size="sm" color={COLORS.muted} />
        <String className="ml-2 flex-1" colorVariant={shortAddressValue ? 'dark' : 'muted'}>
          {shortAddressValue?.length > 0 ? shortAddressValue : t('create-session.create-field.address_placeholder')}
        </String>
        <Icon name="arrow-right-regular" size="xs" color={COLORS.muted} />
      </Pressable>
      {error?.message && (
        <String variant="body-xs" colorVariant="error" className="mt-1">
          {t(error.message)}
        </String>
      )}
    </Box>
  )
}
