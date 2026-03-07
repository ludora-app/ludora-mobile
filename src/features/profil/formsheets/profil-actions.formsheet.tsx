import { useState } from 'react'
import { Box, Wrapper } from '@ludo/ui'
import { useForm } from 'react-hook-form'
import { useTranslate } from '@tolgee/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalSearchParams, useRouter } from 'expo-router'

import { ErrorResponse } from '@/api/orval.instance'
import { useSafeArea } from '@/hooks/safe-area.hook'
import { useToast } from '@/components/chill-ui-library'
import { IS_ANDROID } from '@/constants/platform.constants'
import { CreateReportDtoReason } from '@/api/generated/model'
import { useAnalytics } from '@/hooks/analytics-trackers.hook'
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants'

import { useReportUser } from '../queries/report-user.query'
import { FormSheetView, ParamsFormSheetActions } from '../types'
import { ProfilReportDescriptionSchema, profilReportDescriptionSchema } from '../schemas/profil-report-description.schema'
import ProfilHeaderActionsBlockUser from '../components/profil-header/profil-header-actions/profil-header-actions-block-user.component'
import ProfilHeaderActionsReportUser from '../components/profil-header/profil-header-actions/profil-header-actions-report/profil-header-actions-report-user.component'
import ProfilHeaderActionsReportHeader from '../components/profil-header/profil-header-actions/profil-header-actions-report/profil-header-actions-report-header.component'
import ProfilHeaderActionsReportReasons from '../components/profil-header/profil-header-actions/profil-header-actions-report/profil-header-actions-report-reasons.component'
import ProfilHeaderActionsReportConfirmDialog from '../components/profil-header/profil-header-actions/profil-header-actions-report/profil-header-actions-report-confirm-dialog.component'
import ProfilHeaderActionReportReasonsOtherInput from '../components/profil-header/profil-header-actions/profil-header-actions-report/profil-header-actions-report-other/profil-header-action-report-reasons-other-input.component'
import ProfilHeaderActionReportReasonsOtherBottomSheet from '../components/profil-header/profil-header-actions/profil-header-actions-report/profil-header-actions-report-other/profil-header-action-report-reasons-other-bottom-sheet.component'

const ALREADY_REPORTED_ERROR = "You already reported this user for this reason"

export default function ProfilActionsFormsheet() {
  const { bottom } = useSafeArea()
  const { t } = useTranslate()
  const router = useRouter()
  const { toast } = useToast()
  const { firstname, id: userId, lastname } = useLocalSearchParams<ParamsFormSheetActions>()
  const { trackError, trackEvent } = useAnalytics()
  const { isPending: isLoadingReport, mutateAsync: reportUser } = useReportUser()

  const [view, setView] = useState<FormSheetView>('actions')
  const [selectedReason, setSelectedReason] = useState<CreateReportDtoReason | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const schema = profilReportDescriptionSchema(t)

  const { control, getValues, handleSubmit, resetField } = useForm<ProfilReportDescriptionSchema>({
    resolver: zodResolver(schema),
  })


  const handleView = (selectedView: FormSheetView) => {
    setView(selectedView)
  }

  const handleSelectReason = (reason: CreateReportDtoReason) => {
    setSelectedReason(reason)
    if (reason !== CreateReportDtoReason.OTHER) {
      resetField('description')
      setShowConfirmDialog(true)
    }
  }

  const handleConfirmReport = async () => {
    if (!selectedReason || !userId) return
    try {
      const reportData = {
        description: selectedReason === CreateReportDtoReason.OTHER ? getValues('description') : undefined,
        reason: selectedReason,
        reportedUid: userId,
      }

      await reportUser(reportData)

      trackEvent({
        data: { reason: selectedReason },
        eventName: ANALYTICS_EVENTS.PROFIL.PROFIL_HEADER_ACTIONS_REPORT_USER
      })
      router.back()
      toast({
        message: t('profil.report_user_success_message', { name: `${firstname} ${lastname}` }),
        variant: 'success',
      })
    } catch (error) {
      const errorResponse = error as ErrorResponse
      if (errorResponse.api_error_detail === ALREADY_REPORTED_ERROR) {
        toast({
          allowMultiple: true,
          message: t("profil.report_already_sent"),
          variant: "info"
        })
        return
      }
      trackError({ error })
    }
  }
  const handleSubmitDescription = () => {
    setShowConfirmDialog(true)
  }

  return (
    <Box style={{ paddingBottom: IS_ANDROID && bottom }}>
      <ProfilHeaderActionsReportHeader
        view={view}
        setView={setView}
      />
      <Wrapper className='gap-4 py-4'>
        {view === 'actions' && (
          <Box className='gap-4'>
            <ProfilHeaderActionsBlockUser />
            <ProfilHeaderActionsReportUser onPress={() => handleView('report-reasons')} />
          </Box>
        )}
        {view === 'report-reasons' && (
          <ProfilHeaderActionsReportReasons
            onSelectReason={handleSelectReason}
            onPressOther={() => handleView('report-reasons-other')} />
        )}
        {view === 'report-reasons-other' && (
          <ProfilHeaderActionReportReasonsOtherInput control={control} />
        )}

        <ProfilHeaderActionsReportConfirmDialog
          firstname={firstname}
          lastname={lastname}
          reportDescription={getValues("description")}
          selectedReason={selectedReason}
          handleConfirmReport={handleConfirmReport}
          isLoadingReport={isLoadingReport}
          showConfirmDialog={showConfirmDialog}
          setShowConfirmDialog={setShowConfirmDialog}
        />
      </Wrapper>
      {view === 'report-reasons-other' &&
        <ProfilHeaderActionReportReasonsOtherBottomSheet
          onPress={handleSubmit(handleSubmitDescription)}
        />}
    </Box>
  )
}