import { useEffect } from 'react';
import { isString } from 'radash';
import { Button } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { serialize } from '@/utils/json.utils';
import { mmkvStorage } from '@/utils/mmkv-storage.utils';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { MMKV_STORAGE_KEY } from '@/constants/mmkv-keys.constants';
import FormSheetFooter from '@/components/ui/form-sheet/components/form-sheet-footer.component';

import { FiltersReturnParams, FiltersScreenParams } from '../types/filters.types';
import { useFiltersStore, selectFilters, selectNumberOfFilters } from '../store/filters.store';

const mmkvStorageKey = {
  goBackPath: MMKV_STORAGE_KEY.FILTERS_SCREEN.GO_BACK_PATH,
  source: MMKV_STORAGE_KEY.FILTERS_SCREEN.SOURCE,
};

export default function FilterFooter() {
  const { goBackPath, source } = useLocalSearchParams<FiltersScreenParams>();

  const { t } = useTranslate();
  const numberOfFilters = useFiltersStore(selectNumberOfFilters);
  const filters = useFiltersStore(selectFilters);

  const router = useRouter();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (!goBackPath || !isString(goBackPath)) return;
    if (!source || !isString(source)) return;
    mmkvStorage.setItem(mmkvStorageKey.goBackPath, goBackPath);
    mmkvStorage.setItem(mmkvStorageKey.source, source);
  }, [goBackPath, source]);

  const handleCancel = () => {
    router.back();
  };

  const handleApply = () => {
    const backPatchValue = goBackPath ?? mmkvStorage.getString(mmkvStorageKey.goBackPath);
    const sourceValue =
      source ?? (mmkvStorage.getString(mmkvStorageKey.source) as FiltersScreenParams['source']) ?? 'filter_fields';
    trackEvent({ data: { filters, numberOfFilters }, eventName: `${sourceValue}_applied` });
    const params: FiltersReturnParams = {
      selectedFilters: serialize(filters),
    };

    router.dismissTo({ params, pathname: backPatchValue });
    mmkvStorage.removeItem(mmkvStorageKey.goBackPath);
    mmkvStorage.removeItem(mmkvStorageKey.source);
  };

  return (
    <FormSheetFooter hasBottomSafeArea>
      <Button title={t('filters.apply_button', { activeFilters: numberOfFilters })} size="md" onPress={handleApply} />
      <Button title={t('common.button_cancel')} variant="outlined" size="md" onPress={handleCancel} />
    </FormSheetFooter>
  );
}
