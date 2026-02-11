import { useTranslate } from '@tolgee/react';

import { Button } from '@/components/ludo-ui';
import FormSheetFooter from '@/components/ui/form-sheet/components/form-sheet-footer.component';

interface CreateSessionFooterStep3Props {
  onPress: () => void;
  isDisabled?: boolean;
}

export default function CreateSessionFooterStep3(props: CreateSessionFooterStep3Props) {
  const { isDisabled, onPress } = props;
  const { t } = useTranslate();

  return (
    <FormSheetFooter hasBottomSafeArea>
      <Button title={t('common.button_next')} onPress={onPress} isDisabled={isDisabled} />
    </FormSheetFooter>
  );
}
