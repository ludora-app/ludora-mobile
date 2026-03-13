import { Button } from '@ludo/ui'
import { useTranslate } from '@tolgee/react'

import FormSheetFooter from '@/components/ui/form-sheet/components/form-sheet-footer.component'

interface ProfilHeaderActionReportReasonsOtherBottomSheetProps {
  onPress: () => void
}

export default function ProfilHeaderActionReportReasonsOtherBottomSheet(
  props: ProfilHeaderActionReportReasonsOtherBottomSheetProps) {
  const { onPress } = props
  const { t } = useTranslate()

  return (
    <FormSheetFooter>
      <Button
        title={t('common.button_confirm')}
        colorVariant="primary"
        onPress={onPress}
      />
    </FormSheetFooter>
  )
}