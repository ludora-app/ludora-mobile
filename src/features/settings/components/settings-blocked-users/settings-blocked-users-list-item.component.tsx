import { Avatar, Box, BoxRow, BoxRowCenterBetween, String } from '@ludo/ui'

import { UserSimpleDisplayWithUidData } from '@/api/generated/model'

interface SettingsBlockedUsersListItemProps {
  item: UserSimpleDisplayWithUidData
}

export default function SettingsBlockedUsersListItem({ item }: SettingsBlockedUsersListItemProps) {
  const { firstname, imageUrl, lastname } = item

  return (
    <Box>
      <BoxRowCenterBetween className="border-primary bg-primary/10 gap-3 rounded-2xl border px-4 py-3">
        <BoxRow className="flex-1 items-center gap-3">
          <Avatar
            data={{
              firstname,
              imageUrl,
              lastname,
            }}
          />
          <Box className="flex-1">
            <String useFastText={false} truncate>
              {firstname} {lastname}
            </String>
          </Box>
        </BoxRow>
      </BoxRowCenterBetween>
    </Box>
  )
}
