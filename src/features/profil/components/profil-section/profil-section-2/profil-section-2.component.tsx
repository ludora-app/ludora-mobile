import { Pressable } from 'react-native'
import { useTranslate } from '@tolgee/react';
import { Icon, Link, String } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';

interface ProfilSesion2Props {
  bio: string
  isMe: boolean
}

export default function ProfilSesion2(props: ProfilSesion2Props) {
  const { bio: userBio, isMe: isProfilMe } = props
  const { t } = useTranslate()

  if (isProfilMe) {
    if (!userBio) {
      return (
        <Link href={ROUTES.PROFIL.EDIT_BIO} asChild>
          <Pressable className='flex-row items-center justify-between'>
            <String colorVariant="muted">{t("profil.add_bio_description")}</String>
            <Icon name="e-pen-regular" color={COLORS.primary} />
          </Pressable>
        </Link>
      )
    }
  }

  if (!userBio) {
    return null
  }

  return (
    <String>{userBio}</String>
  )
}