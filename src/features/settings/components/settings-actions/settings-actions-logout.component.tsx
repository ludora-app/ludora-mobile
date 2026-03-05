import { Button } from '@ludo/ui'
import { useTranslate } from '@tolgee/react'

import COLORS from '@/constants/colors.contstants'
import { useAuthHelpers } from '@/hooks/auth-helpers.hook'

export default function SettingsActionsLogout() {
  const { t } = useTranslate()
  const { logout } = useAuthHelpers()

  const handleLogout = () => {
    logout()
  }

  return (
    <Button
      title={t('settings.logout')}
      onPress={handleLogout}
      colorVariant='danger'
      loaderProps={{
        color: COLORS.danger
      }}
      variant="outlined"
    />
  )
}