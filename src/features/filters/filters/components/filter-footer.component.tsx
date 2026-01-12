import { useEffect } from 'react';
import { isString } from 'radash';
import { Button } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { serialize } from '@/utils/json.utils';
import { mmkvStorage } from '@/utils/mmkvStorage';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { MMKV_STORAGE_KEY } from '@/constants/mmkv-keys.constants';
import FormSheetFooter from '@/components/ui/form-sheet/components/form-sheet-footer.component';

import { useFiltersStore } from '../store/filters.store';
import { FiltersReturnParams, FiltersScreenParams } from '../types/filters.types';

const mmkvStorageKey = MMKV_STORAGE_KEY.FILTERS_SCREEN_GOBACK_PATH;

export default function FilterFooter() {
  const { goBackPath, source } = useLocalSearchParams<FiltersScreenParams>();

  const { t } = useTranslate();
  const numberOfFilters = useFiltersStore(state => state.numberOfFilters);
  const filters = useFiltersStore(state => state.filters);

  const router = useRouter();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (!goBackPath || !isString(goBackPath)) return;
    mmkvStorage.setItem(mmkvStorageKey, goBackPath);
  }, [goBackPath]);

  const handleCancel = () => {
    router.back();
  };

  const handleApply = () => {
    const backPatchValue = goBackPath ?? mmkvStorage.getString(mmkvStorageKey);
    trackEvent({ eventName: `${source}_applied`, properties: { filters, numberOfFilters } });
    const params: FiltersReturnParams = {
      selectedFilters: serialize(filters),
    };
    router.dismissTo({ params, pathname: backPatchValue });
    mmkvStorage.removeItem(mmkvStorageKey);
  };

  return (
    <FormSheetFooter hasBottomSafeArea>
      <Button title={t('common.button_cancel')} variant="outlined" size="md" onPress={handleCancel} />
      <Button title={t('filters.apply_button', { activeFilters: numberOfFilters })} size="md" onPress={handleApply} />
    </FormSheetFooter>
  );
}
