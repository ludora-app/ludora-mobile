import { debounce } from 'radash';
import { useEffect, useRef } from 'react';
import { useTranslate } from '@tolgee/react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormInput } from '@/components/ludo-ui';

import { filtersAddressesSchema, FiltersAddressesSchema } from '../schemas/filters-addresses.schema';

type FiltersAddressesListInputProps = {
  onChange: (value: string) => void;
};

export default function FiltersAddressesListInput(props: FiltersAddressesListInputProps) {
  const { onChange } = props;
  const { control } = useForm<FiltersAddressesSchema>({
    resolver: zodResolver(filtersAddressesSchema),
  });
  const { t } = useTranslate();

  const value = useWatch({ control, name: 'address' });
  const debouncedOnChangeRef = useRef(
    debounce({ delay: 300 }, (val: string) => {
      onChange(val);
    }),
  );

  useEffect(() => {
    debouncedOnChangeRef.current(value);
  }, [value]);
  return (
    <FormInput
      control={control}
      name="address"
      placeholder={t('filters-addresses.formsheet_input_placeholder')}
      autoFocus
    />
  );
}
