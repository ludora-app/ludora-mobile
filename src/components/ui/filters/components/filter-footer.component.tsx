import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Button, Wrapper } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { useSafeArea } from '@/hooks/safe-area.hook';

import { useFiltersStore } from '../store/filters.store';

const styles = StyleSheet.create({
  footer: {
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {
      height: -10,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
  },
});
export default function FilterFooter() {
  const { bottom } = useSafeArea();
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
    <Wrapper className="gap-2 py-2" style={[styles.footer, { paddingBottom: bottom }]} fill={false}>
      <Button title={t('common.button_cancel')} variant="outlined" size="md" onPress={handleCancel} />
      <Button title={t('filters.apply_button', { activeFilters: numberOfFilters })} size="md" onPress={handleApply} />
    </Wrapper>
  );
}
