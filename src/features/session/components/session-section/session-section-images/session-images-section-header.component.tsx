import { Share } from 'react-native'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import { useTranslate } from '@tolgee/react'
import { BoxRow, BoxRowCenterBetween, Icon, Wrapper } from '@ludo/ui'

import ROUTES from '@/constants/routes.constants'

type SessionSectionImagesHeaderProps = {
  sessionUid: string
}


export default function SessionSectionImagesHeader({ sessionUid }: SessionSectionImagesHeaderProps) {
  const router = useRouter()
  const { t } = useTranslate()

  const handleInviteInApp = () => {
    router.navigate(ROUTES.INVITE_FRIENDS.INDEX_UID(sessionUid));
  }

  const handleShareLink = async () => {
    try {
      const url = Linking.createURL(ROUTES.SESSION.INDEX_UID(sessionUid))
      await Share.share({
        message: t('session.share_message', { url }),
        title: t('session.share_title'),
        url,
      })
    } catch {
      // dismissed or error
    }
  }

  return (
    <Wrapper>
      <BoxRowCenterBetween className="w-full">
        <Icon
          name="arrow-left-regular"
          onPress={router.back}
          className="rounded-full bg-black/30"
        />
        <BoxRow className="items-center gap-2">
          <Icon
            name="user-add-solid"
            className="rounded-full bg-black/30 p-2"
            onPress={handleInviteInApp}
          />
          <Icon
            name="share-regular"
            className="rounded-full bg-black/30 p-2"
            onPress={handleShareLink}
          />
        </BoxRow>
      </BoxRowCenterBetween>
    </Wrapper>
  )
}
