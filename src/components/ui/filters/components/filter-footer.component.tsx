import { Box, Button } from '@ludo/ui';
import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';

import { useFiltersStore } from '../store/filters.store';

export default function FilterFooter() {
  const { t } = useTranslate();
  const numberOfFilters = useFiltersStore(state => state.numberOfFilters);
  const router = useRouter();

  const handleCancel = () => {
    console.log('cancel');
    router.back();
  };

  const handleApply = () => {
    console.log('apply');
    router.back();
  };

  return (
    <Box className="gap-2">
      <Button title={t('common.button_cancel')} variant="outlined" size="md" onPress={handleCancel} />
      <Button title={t('filters.apply_button', { activeFilters: numberOfFilters })} size="md" onPress={handleApply} />
    </Box>
  );
}
