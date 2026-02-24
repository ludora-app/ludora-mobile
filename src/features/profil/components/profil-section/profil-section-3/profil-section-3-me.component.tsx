import { useTranslate } from '@tolgee/react'
import { BoxRow, Button, Link } from '@ludo/ui'

import ROUTES from '@/constants/routes.constants'

export default function ProfilSection3Me() {
  const { t } = useTranslate()

  return (
    <BoxRow className='items-center gap-2'>
      <Link href={ROUTES.PROFIL.EDIT} asChild>
        <Button title={t('profil.edit_my_profile_button_title')} className='flex-1' size="sm" />
      </Link>
      <Button title={t('profil.share_my_profile_button_title')} className='flex-1' size="sm" />
    </BoxRow>
  )
}