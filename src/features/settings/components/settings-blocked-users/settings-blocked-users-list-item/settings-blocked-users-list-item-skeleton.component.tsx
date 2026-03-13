import { memo } from 'react'
import { BoxRow, BoxRowCenterBetween, Skeleton } from '@ludo/ui'

function SettingsBlockedUsersListItemSkeleton() {
  return (
    <BoxRowCenterBetween className="border-primary bg-primary/10 gap-3 rounded-2xl border px-4 py-3">
      <BoxRow className="items-center gap-3 flex-1">
        <Skeleton variant="circle" className='size-14' />
        <Skeleton variant="text" size="sm" className='w-32' />
      </BoxRow>
      <Skeleton variant='rectangle' className='w-20 h-9' />
    </BoxRowCenterBetween>
  )
}

export default memo(SettingsBlockedUsersListItemSkeleton)