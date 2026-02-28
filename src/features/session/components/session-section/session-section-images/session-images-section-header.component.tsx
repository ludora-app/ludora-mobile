import { Share } from 'react-native'
import { useRouter } from 'expo-router'
import { useTranslate } from '@tolgee/react'
import { BoxRow, BoxRowCenterBetween, Icon, Wrapper } from '@ludo/ui'

import ROUTES from '@/constants/routes.constants'
import { useAppNavigation } from '@/hooks/navigation.hooks'
import { useAnalytics } from '@/hooks/analytics-trackers.hook'
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants'

type SessionSectionImagesHeaderProps = {
  sessionUid: string
}


export default function SessionSectionImagesHeader({ sessionUid }: SessionSectionImagesHeaderProps) {
  const router = useRouter()
  const { goBack } = useAppNavigation();
  const { t } = useTranslate()
  const { trackError, trackEvent } = useAnalytics()

  const handleInviteInApp = () => {
    router.navigate(ROUTES.INVITE_FRIENDS.INDEX_UID(sessionUid));
  }

  const handleShareLink = async () => {
    const url = `https://www.ludora.fr${ROUTES.SESSION.INDEX_UID(sessionUid)}`;
    try {
      await Share.share({
        message: t('session.share_message', { url }),
        title: t('session.share_title'),
        url,
      })
      trackEvent({ data: { session_uid: sessionUid }, eventName: ANALYTICS_EVENTS.SESSION.SESSION_SHARED })
    } catch (error) {
      trackError({ error })
    }
  }

  return (
    <Wrapper>
      <BoxRowCenterBetween className="w-full">
        <Icon
          name="arrow-left-regular"
          onPress={goBack}
          className="rounded-full bg-black/30"
        />
        <BoxRow className="items-center gap-2">
          <Icon
            name="user-add-solid"
            className="rounded-full bg-black/30 p-2"
            onPress={handleInviteInApp}
          />
          <Icon
            name="share-solid"
            className="rounded-full bg-black/30 p-2"
            onPress={handleShareLink}
          />
        </BoxRow>
      </BoxRowCenterBetween>
    </Wrapper>
  )
}
