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
      <Link href={ROUTES.MY_FIELDS.INDEX} asChild>
        <Button title={t('profil.see_my_fields_button_title')} className='flex-1' size="sm" variant="outlined" />
      </Link>
    </BoxRow>
  )
}