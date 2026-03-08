import { notFoundImg } from 'assets'
import { useRouter } from 'expo-router'
import { useTranslate } from '@tolgee/react'
import { Button, Image, String, Wrapper } from '@ludo/ui'

import ROUTES from '@/constants/routes.constants';

const getRandomNumber = (nbr: number) => Math.floor(Math.random() * nbr) + 1;

export default function NotFoundScreen() {
  const { t } = useTranslate()
  const router = useRouter()

  const handlePress = () => {
    router.dismissTo(ROUTES.HOME.INDEX)
  }

  return (
    <Wrapper className='flex-1 items-center justify-center gap-4'>
      <Image source={notFoundImg} className='w-full aspect-video' contentFit="contain" />
      <String className='text-center' font="primarySemiBold">
        {t(`no-found.content_v_${getRandomNumber(4)}`)}
      </String>
      <Button
        className="w-full"
        variant="outlined"
        title='Retourner à l accueil'
        onPress={handlePress}
      />

    </Wrapper>
  )
}