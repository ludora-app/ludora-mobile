import { useMemo } from 'react'
import { useRouter } from 'expo-router'
import { useTranslate } from '@tolgee/react'

import { FormSheetView } from '@/features/profil/types'
import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component'

type ProfilHeaderActionsHeaderProps = {
  view: FormSheetView
  setView: (view: FormSheetView) => void
}

export default function ProfilHeaderActionsReportHeader(props: ProfilHeaderActionsHeaderProps) {
  const { setView, view } = props
  const { t } = useTranslate()

  const router = useRouter()

  const handleTitle = useMemo(() => {
    switch (view) {
      case 'actions':
        return 'profil.actions_header_title'
      default:
        return 'profil.report_header_title'
    }
  }, [view])

  const handleGoBack = () => {
    if (view)
      if (view === 'report-reasons') {
        setView('actions')
        return
      }
    if (view === 'report-reasons-other') {
      setView('report-reasons')
      return
    }
    router.back()
  }
  return (
    <FormSheetHeader
      title={t(handleTitle)}
      hasGoBack
      goBackAction={handleGoBack}
    />
  )
}