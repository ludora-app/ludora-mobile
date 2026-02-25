import { useTranslate } from '@tolgee/react';

import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component';

export default function FiltersAddressesHeader() {
  const { t } = useTranslate();

  return <FormSheetHeader title={t('filters-addresses.formsheet_header_title')} hasGoBack />;
}
