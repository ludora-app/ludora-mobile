import { useTranslate } from '@tolgee/react'
import { BoxCenter, Icon, String } from '@ludo/ui'


export default function ProfilSection5Badges() {
  const { t } = useTranslate()
  return (
    <BoxCenter className='gap-1'>
      <Icon name='ludora-sunglass' className='size-40' />
      <String>{t('common.coming_soon')}</String>
    </BoxCenter>
  )
}