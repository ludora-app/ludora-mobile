import { ReactNode } from 'react'
import { ScrollView } from 'react-native'
import { useTranslate } from '@tolgee/react'
import { BoxCenter, Icon, String } from '@ludo/ui'

type Props = {
  listHeaderComponent?: ReactNode
}

export default function ProfilSection5Badges({ listHeaderComponent }: Props) {
  const { t } = useTranslate()
  return (
    <ScrollView contentContainerClassName='grow '>
      {listHeaderComponent}
      <BoxCenter className='gap-1 pt-4 bg-background flex-1 justify-start'>
        <Icon name='ludora-sunglass' className='size-40' />
        <String>{t('common.coming_soon')}</String>
      </BoxCenter>
    </ScrollView >
  )
}
