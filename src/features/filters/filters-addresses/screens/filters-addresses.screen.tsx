import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, WrapperKeyboardAvoidingView } from '@ludo/ui';

import FilterAddressesList from '../components/filter-addresses-list.component';
import FiltersAddressesHeader from '../components/filters-addresses-header.component';
import { FiltersAddressesSchema, filtersAddressesSchema } from '../schemas/filters-addresses.schema';

export default function FiltersAddressesScreen() {
  const { t } = useTranslate();
  const { control, watch } = useForm<FiltersAddressesSchema>({
    resolver: zodResolver(filtersAddressesSchema),
  });

  const value = watch('address');

  return (
    <>
      <FiltersAddressesHeader />
      <WrapperKeyboardAvoidingView className="mb-5" fill={false}>
        <FormInput
          control={control}
          name="address"
          placeholder={t('filters-addresses.formsheet_input_placeholder')}
          autoFocus
        />
        <FilterAddressesList inputValue={value} />
      </WrapperKeyboardAvoidingView>
    </>
  );
}
