import { useTranslate } from '@tolgee/react'

import { truncateString } from '@/utils/string.utils'
import { CreateReportDtoReason } from '@/api/generated/model'
import { DialogConfirm } from '@/components/ui/dialog/dialog-confirm'


type ProfilHeaderActionsReportConfirmDialogProps = {
  firstname: string
  lastname: string
  reportDescription: string | undefined
  selectedReason: CreateReportDtoReason | null
  handleConfirmReport: () => Promise<void>
  isLoadingReport: boolean
  showConfirmDialog: boolean
  setShowConfirmDialog: (showConfirmDialog: boolean) => void
}



export default function ProfilHeaderActionsReportConfirmDialog(props: ProfilHeaderActionsReportConfirmDialogProps) {
  const {
    firstname,
    handleConfirmReport,
    isLoadingReport,
    lastname,
    reportDescription,
    selectedReason,
    setShowConfirmDialog,
    showConfirmDialog
  } = props
  const { t } = useTranslate()

  const getConfirmDialogContent = () => {
    if (!selectedReason) return ''
    if (selectedReason === CreateReportDtoReason.OTHER) {
      return t('profil.report_user_confirm_content_other', {
        description: truncateString({ maxLength: 200, str: reportDescription }),
        name: `${firstname} ${lastname}`,
        reason: t(`profil.report_reason_${selectedReason}`),
      })
    }
    return t('profil.report_user_confirm_content', {
      name: `${firstname} ${lastname}`,
      reason: t(`profil.report_reason_${selectedReason}`),
    })
  }

  return (
    <DialogConfirm
      title={t('profil.report_user_confirm_title', { name: firstname })}
      content={getConfirmDialogContent()}
      source="profil_header_actions_report_user"
      confirmButtonTitleKey="profil.report_user_confirm_button"
      onConfirmPromise={handleConfirmReport}
      isLoading={isLoadingReport}
      priority="confirm"
      open={showConfirmDialog}
      onOpenChange={setShowConfirmDialog}
    />
  )
}