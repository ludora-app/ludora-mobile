import { Button } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import FormSheetFooter from '@/components/ui/form-sheet/components/form-sheet-footer.component';

interface ChatRoomUserProfileReportOtherBottomSheetProps {
  onPress: () => void;
}

export default function ChatRoomUserProfileReportOtherBottomSheet(props: ChatRoomUserProfileReportOtherBottomSheetProps) {
  const { onPress } = props;
  const { t } = useTranslate();

  return (
    <FormSheetFooter>
      <Button title={t('common.button_confirm')} colorVariant="primary" onPress={onPress} />
    </FormSheetFooter>
  );
}
