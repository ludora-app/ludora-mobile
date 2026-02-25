
import { Button } from '@ludo/ui'
import { useRouter } from 'expo-router'
import { useTranslate } from '@tolgee/react'

import { IS_ANDROID } from '@/constants/platform.constants'
import FormSheetFooter from '@/components/ui/form-sheet/components/form-sheet-footer.component'

type ProfilEditFooterProps = {
  handleSubmit: () => void
  isLoading: boolean
}

export default function ProfilEditFooter(props: ProfilEditFooterProps) {
  const { handleSubmit, isLoading } = props
  const router = useRouter()
  const { t } = useTranslate()

  return (
    <FormSheetFooter hasBottomSafeArea={IS_ANDROID}>
      <Button title={t('common.save')} onPress={handleSubmit} isLoading={isLoading} />
      <Button title={t('common.button_cancel')} onPress={router.back} variant="outlined" />
    </FormSheetFooter>
  )
}