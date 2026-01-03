import { Box, String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component';

export default function FiltersAddressesHeader() {
  const { t } = useTranslate();

  return (
    <>
      <FormSheetHeader />
      <Box className="my-4 items-center">
        <String font="primaryBold" variant="body-3">
          {t('filters-addresses.formsheet_header_title')}
        </String>
      </Box>
    </>
  );
}
