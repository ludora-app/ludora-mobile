import { Box } from '@ludo/ui'
import { useTranslate } from '@tolgee/react'

import { CreateReportDtoReason } from '@/api/generated/model'

import ProfilHeaderActionsItem from '../profil-header-actions-item.component'

export const REPORT_REASONS = [
  CreateReportDtoReason.SPAM,
  CreateReportDtoReason.HARASSMENT,
  CreateReportDtoReason.NUDITY,
  CreateReportDtoReason.OTHER
] as const

interface ProfilHeaderActionsReportReasonsProps {
  onPressOther: () => void
  onSelectReason: (reason: CreateReportDtoReason, description?: string) => void
}

export default function ProfilHeaderActionsReportReasons(props: ProfilHeaderActionsReportReasonsProps) {
  const { onPressOther, onSelectReason } = props
  const { t } = useTranslate()

  const handleReasonPress = (reason: CreateReportDtoReason) => {
    if (reason === CreateReportDtoReason.OTHER) {
      onPressOther()
    }
    onSelectReason(reason)
  }

  return (
    <Box className="gap-3">
      {REPORT_REASONS.map((reason) => (
        <ProfilHeaderActionsItem
          key={reason}
          iconName="shield-excalmation-solid"
          label={t(`profil.report_reason_${reason}`)}
          onPress={() => handleReasonPress(reason)}
        />
      ))}
    </Box>
  )
}
