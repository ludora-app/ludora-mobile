import { useRouter } from 'expo-router'
import { ScrollView } from 'react-native'
import { useTranslate } from '@tolgee/react'
import { Button, ScreenLayout, Separator, Wrapper } from '@ludo/ui'

import { TIconsAll } from '@/constants/ICONS'
import ROUTES from '@/constants/routes.constants'
import { useSafeArea } from '@/hooks/safe-area.hook'
import { useAuthHelpers } from '@/hooks/auth-helpers.hook'

import SettingsHeader from '../components/settings-header.component'
import SettingsSection from '../components/settings-section.component'
import SettingsMenuItem from '../components/settings-menu-item.component'



interface TSettingsMenuItem {
  id: number
  label: string
  route: string
  description: string
  iconName: TIconsAll
}


const SETTINGS_MENU = {
  "settings.section_account_title": [
    {
      description: 'settings.section_account_personal_info_description',
      iconName: 'user-regular',
      id: 1,
      label: 'settings.section_account_personal_info',
      route: ROUTES.PROFIL.EDIT,
    }
  ],
  "settings.section_preference_title": [
    {
      description: 'settings.section_preferences_sport_description',
      iconName: 'running-regular',
      id: 1,
      label: 'settings.section_preferences_sport',
      route: ROUTES.SETTINGS.PREFERENCES,
    },
    {
      description: 'settings.section_preferences_planning_description',
      iconName: 'calendar-regular',
      id: 2,
      label: 'settings.section_preferences_planning',
      route: ROUTES.SETTINGS.PLANNING,
    }
  ],
  "settings.section_shortcuts_title": [
    {
      description: 'settings.section_shortcuts_notifications_description',
      iconName: 'bell-regular',
      id: 1,
      label: 'settings.section_shortcuts_notifications',
      route: ROUTES.NOTIFICATIONS.INDEX,
    },
    {
      description: 'settings.section_shortcuts_favorites_description',
      iconName: 'heart-regular',
      id: 2,
      label: 'settings.section_shortcuts_favorites',
      route: ROUTES.SETTINGS.FAVORITES,
    },
    {
      description: 'settings.section_shortcuts_history_description',
      iconName: 'clock-regular',
      id: 3,
      label: 'settings.section_shortcuts_history',
      route: ROUTES.SETTINGS.HISTORY,
    }
  ],
  //
  "settings.section_legal_title": [
    {
      description: 'settings.section_legal_terms_description',
      iconName: 'info-circle-regular',
      id: 1,
      label: 'settings.section_legal_terms',
      route: ROUTES.SETTINGS.TERMS,
    },
    {
      description: 'settings.section_legal_privacy_description',
      iconName: 'share-regular',
      id: 2,
      label: 'settings.section_legal_privacy',
      route: ROUTES.SETTINGS.PRIVACY_POLICY,
    }
  ],
} as const satisfies Record<string, TSettingsMenuItem[]>


export default function SettingsScreen() {
  const { t } = useTranslate()
  const { bottom } = useSafeArea()
  const { logout } = useAuthHelpers()
  const router = useRouter()

  const handleLogout = () => {
    logout()
  }

  return (
    <ScreenLayout>
      <ScrollView
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SettingsHeader titleKey="settings.header_title" />
        <Wrapper fill className='bg-background rounded-t-xl z-50 pt-6 gap-5' style={{ paddingBottom: bottom }}>

          {Object.entries(SETTINGS_MENU).map(([title, items]) => (
            <SettingsSection title={t(title)} key={title}>
              {items.map((item: TSettingsMenuItem) => (
                <>
                  <SettingsMenuItem
                    key={item.id + title}
                    iconName={item.iconName}
                    label={t(item.label)}
                    description={t(item.description)}
                    onPress={() => router.push(item.route)}
                  />
                  {item.id !== items.length && <Separator />}
                </>
              ))}
            </SettingsSection>
          ))}

          <Button
            title={t('settings.logout')}
            onPress={handleLogout}
            colorVariant='danger'
            variant="outlined"
          />
        </Wrapper>
      </ScrollView>
    </ScreenLayout>
  )
}
