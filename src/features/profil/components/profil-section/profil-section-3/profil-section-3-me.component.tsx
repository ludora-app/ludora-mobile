import { BoxRow, Button } from '@ludo/ui'
import { useTranslate } from '@tolgee/react'


export default function ProfilSection3Me() {
  const { t } = useTranslate()

  return (
    <BoxRow className='items-center gap-2'>
      <Button title={t('profil.see_my_cards_button_title')} className='flex-1' size="xs" isDisabled colorVariant="muted" />
      <Button title={t('profil.share_my_profile_button_title')} className='flex-1' size="xs" />
    </BoxRow>
  )
}