import { cn } from '@chillui/ui'
import { useTranslate } from '@tolgee/react'
import { Box, String, Wrapper } from '@ludo/ui'
import { TouchableOpacity } from 'react-native'

import { ProfilTab, useProfilStore } from '@/features/profil/stores/profil.store'

const OPTIONS = [
  {
    labelKey: 'common.matches',
    value: ProfilTab.Matches,
  },
  {
    labelKey: 'common.badges',
    value: ProfilTab.Badges,
  },
]

export default function ProfilSection5ListSegmentedControl() {
  const { t } = useTranslate()
  const selectedTab = useProfilStore(state => state.selectedTab)
  const setSelectedTab = useProfilStore(state => state.setSelectedTab)

  return (
    <Wrapper className='py-4 bg-background'>
      <Box className='flex-row  border border-[#000000]/30 rounded-xl h-12 p-1'>
        {OPTIONS.map(option => {
          const isActive = selectedTab === option.value
          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => setSelectedTab(option.value)}
              className={
                cn("flex-1 items-center justify-center rounded-lg",
                  { "bg-white shadow-sm shadow-black/10": isActive })}
            >
              <String
                font='primaryBold'
                colorVariant={isActive ? "black" : "muted"}
              >
                {t(option.labelKey)}
              </String>
            </TouchableOpacity>
          )
        })}
      </Box>
    </Wrapper>
  )
}
