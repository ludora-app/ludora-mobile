import { useTranslate } from '@tolgee/react'

import ProfilHeaderActionsItem from '../profil-header-actions-item.component'

interface ProfilHeaderActionsReportUserProps {
  onPress: () => void
}

export default function ProfilHeaderActionsReportUser(props: ProfilHeaderActionsReportUserProps) {
  const { onPress } = props
  const { t } = useTranslate()

  return (
    <ProfilHeaderActionsItem
      iconName="shield-excalmation-solid"
      label={t('profil.report_user_button_label')}
      onPress={onPress}
    />
  )
}