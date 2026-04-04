
import { BoxRow } from '@ludo/ui'

import { useGetSessionsMeStats } from '@/features/settings/queries/get-sessions-me-stats.query'
import { SessionsFindAllMySessionsOwnership, UserSessionStatsResponseDataDto } from '@/api/generated/model'

import SettingsSessionsHistoryTypeItem from './settings-sessions-history-type-item.component'

const EMPTY_SESSION_STATS: UserSessionStatsResponseDataDto = {
  organizedCount: 0,
  participatedCount: 0,
}

interface SettingsSessionsHistoryTypeItemProps {
  titleKey: string
  totalSessions: number
  ownership: SessionsFindAllMySessionsOwnership
}

const TYPES = (data: UserSessionStatsResponseDataDto): SettingsSessionsHistoryTypeItemProps[] => [
  {
    ownership: "CREATOR",
    titleKey: 'settings.history.my_sessions_created_title',
    totalSessions: data?.organizedCount ?? 0,
  },
  {
    ownership: "PLAYER",
    titleKey: 'settings.history.my_sessions_participated_title',
    totalSessions: data?.participatedCount ?? 0,
  },
]

export default function SettingsSessionsHistoryTypeList() {
  const { data } = useGetSessionsMeStats()
  return (
    <BoxRow className='items-center gap-4'>
      {TYPES(data ?? EMPTY_SESSION_STATS).map((type) => (
        <SettingsSessionsHistoryTypeItem key={type.titleKey} {...type} />
      ))}
    </BoxRow>
  )
}