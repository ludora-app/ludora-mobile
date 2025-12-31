import dayjs from 'dayjs';
import { Pressable } from 'react-native';
import { Box, Link, String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { useFiltersStore } from '../store/filters.store';

export default function FilterSessionDate() {
  const { t } = useTranslate();
  const date = useFiltersStore(state => state.filters.date);
  const formatedDate = dayjs(date).format('DD/MM/YYYY');

  return (
    <Link href="/filters/filters-calendar" asChild>
      <Pressable>
        <Box className="gap-2 rounded-xl border border-ring bg-white p-3 py-4">
          <Box className="flex-row justify-between">
            <String variant="body-sm" font="primaryBold" colorVariant="muted">
              {t('filters.session_date_title')}
            </String>
            <String variant="body-sm" font="primaryBold">
              {formatedDate}
            </String>
          </Box>
        </Box>
      </Pressable>
    </Link>
  );
}
