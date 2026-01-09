import { useTranslate } from '@tolgee/react';
import { Box, Button, Icon, String } from '@ludo/ui';

import { useFiltersStore } from '../store/filters.store';

const fieldType = [
  {
    id: 'ALL',
    value: 'ALL',
  },
  {
    id: 'PRIVATE',
    value: 'PRIVATE',
  },
  {
    id: 'PUBLIC',
    value: 'PUBLIC',
  },
];

export default function FilterFieldType() {
  const { t } = useTranslate();
  const fieldTypeStore = useFiltersStore(state => state.filters.fieldType);
  const setFilters = useFiltersStore(state => state.setFilters);

  return (
    <Box className="gap-3 rounded-xl border border-ring bg-white p-3 py-2">
      {/* Header Toujours Visible */}
      <Box className="flex-row justify-between">
        <Box className="flex-row items-center gap-2">
          <Icon name="football-field-regular" color="#666" />
          <String variant="body-sm" font="primaryBold" colorVariant="muted">
            {t('filters.field_type_title')}
          </String>
        </Box>
        <String variant="body-sm" font="primaryBold">
          {t(`filters.field_type_${fieldTypeStore}`)}
        </String>
      </Box>

      <Box className="flex-row gap-2">
        {fieldType.map(type => (
          <Button
            key={type.id}
            title={t(`filters.field_type_${type.value}`)}
            className="flex-1"
            size="xs"
            variant={type.value === fieldTypeStore ? 'contained' : 'outlined'}
            onPress={() => setFilters({ fieldType: type.value })}
          />
        ))}
      </Box>
    </Box>
  );
}
