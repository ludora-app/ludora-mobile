import { IconButton } from '@ludo/ui'
import { useLocalSearchParams, useRouter } from 'expo-router'

import ROUTES from '@/constants/routes.constants'
import COLORS from '@/constants/colors.contstants'

import { ParamsFormSheetActions } from '../../../types'


type ProfilHeaderActionsProps = {
  isMe: boolean
  firstname: string
  lastname: string
}


export default function ProfilHeaderActions(props: ProfilHeaderActionsProps) {
  const router = useRouter()
  const { id: userId } = useLocalSearchParams()
  const { firstname, isMe, lastname } = props

  if (isMe) return null

  const handlePress = () => {
    const params: ParamsFormSheetActions = {
      firstname,
      lastname,
    }
    router.navigate({ params, pathname: ROUTES.PROFIL.ACTIONS_UID(userId as string) })
  }

  return (
    <IconButton
      iconName="3-dots-more-solid"
      colorVariant="white" iconColor={COLORS.primary}
      size='md'
      as="scale-pressable"
      onPress={handlePress}
    />
  )
}