import { Fragment } from 'react'
import { useRouter } from 'expo-router'
import { useTranslate } from '@tolgee/react'
import { ScreenLayout, ScrollView, Separator, Wrapper } from '@ludo/ui'

import ROUTES from '@/constants/routes.constants'
import { useSafeArea } from '@/hooks/safe-area.hook'
import { TIconsAll } from '@/constants/icons.constants'

import SettingsHeader from '../components/settings-header.component'
import SettingsSection from '../components/settings-section.component'
import SettingsMenuItem from '../components/settings-menu-item.component'
import SettingsActions from '../components/settings-actions/settings-actions.component'



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
  "settings.section_legal_title": [
    {
      description: 'settings.section_legal_terms_description',
      iconName: 'info-circle-regular',
      id: 1,
      label: 'settings.section_legal_terms',
      route: ROUTES.LEGAL.CGU_MENTIONS,
    },
    {
      description: 'settings.section_legal_sales_terms_description',
      iconName: 'document-text-2-regular',
      id: 2,
      label: 'settings.section_legal_sales_terms',
      route: ROUTES.LEGAL.CGV,
    },
    {
      description: 'settings.section_legal_privacy_description',
      iconName: "document-normal-regular",
      id: 3,
      label: 'settings.section_legal_privacy',
      route: ROUTES.LEGAL.PRIVACY,
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
      description: 'settings.section_shortcuts_friends_description',
      iconName: 'user-add-regular',
      id: 2,
      label: 'settings.section_shortcuts_friends',
      route: ROUTES.SETTINGS.FRIENDS,
    },
    {
      description: 'settings.section_shortcuts_blocked_users_description',
      iconName: 'fordbidden-contact-regular',
      id: 3,
      label: 'settings.section_shortcuts_blocked_users',
      route: ROUTES.SETTINGS.BLOCKED_USERS,
    },
    {
      description: 'settings.section_shortcuts_my_fields_description',
      iconName: "football-field-regular",
      id: 4,
      label: 'settings.section_shortcuts_my_fields',
      route: ROUTES.MY_FIELDS.INDEX,
    },
    {
      description: 'settings.section_shortcuts_history_description',
      iconName: 'clock-regular',
      id: 5,
      label: 'settings.section_shortcuts_history',
      route: ROUTES.SETTINGS.HISTORY,
    }
  ],
  "settings.section_support_title": [
    {
      description: 'settings.section_support_contact_description',
      iconName: 'conversation-box-regular',
      id: 1,
      label: 'settings.section_support_contact',
      route: ROUTES.SETTINGS.CONTACT,
    },
    {
      description: 'settings.section_support_faq_description',
      iconName: 'info-circle-regular',
      id: 2,
      label: 'settings.section_support_faq',
      route: ROUTES.SETTINGS.FAQ,
    }
  ],
} as const satisfies Record<string, TSettingsMenuItem[]>


export default function SettingsScreen() {
  const { t } = useTranslate()
  const { bottom } = useSafeArea()
  const router = useRouter()

  return (
    <ScreenLayout>
      <ScrollView bounces={false}>
        <SettingsHeader titleKey="settings.header_title" hasTopSafeArea hasHorizontalPadding />
        <Wrapper fill className='bg-background rounded-t-xl z-50 pt-6 gap-5' style={{ paddingBottom: bottom }}>

          {Object.entries(SETTINGS_MENU).map(([title, items]) => (
            <SettingsSection title={t(title)} key={title}>
              {items.map((item: TSettingsMenuItem) => (
                <Fragment key={item.id}>
                  <SettingsMenuItem
                    iconName={item.iconName}
                    label={t(item.label)}
                    description={t(item.description)}
                    onPress={() => router.navigate(item.route)}
                  />
                  {item.id !== items.length && <Separator />}
                </Fragment>
              ))}
            </SettingsSection>
          ))}
          <SettingsActions />
        </Wrapper>
      </ScrollView>
    </ScreenLayout>
  )
}
