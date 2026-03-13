import React from 'react'
import { BoxRow, IconButton, Link } from '@ludo/ui'

import COLORS from '@/constants/colors.contstants'

import ProfilHeaderNotification from './profil-header-notification.component'

type ProfilHeaderActionsMeProps = {
  isMe: boolean
}

export default function ProfilHeaderActionsMe(props: ProfilHeaderActionsMeProps) {
  const { isMe } = props

  if (!isMe) return null

  return (
    <BoxRow className='items-center gap-2'>
      <ProfilHeaderNotification />
      <Link href="/settings" asChild>
        <IconButton
          iconName='setting-gear-regular'
          colorVariant="white" iconColor={COLORS.primary}
          size='md'
          as="scale-pressable" />
      </Link>
    </BoxRow>
  )
}