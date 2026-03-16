import { debounce } from 'radash'
import { useForm } from 'react-hook-form'
import { useTranslate } from '@tolgee/react'
import React, { useEffect, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormInput } from '@/components/ludo-ui'

import { filtersAddressesSchema, FiltersAddressesSchema } from '../schemas/filters-addresses.schema'

type FiltersAddressesListInputProps = {
  onChange: (value: string) => void;
}

export default function FiltersAddressesListInput(props: FiltersAddressesListInputProps) {
  const { onChange } = props;
  const { control, watch } = useForm<FiltersAddressesSchema>({
    resolver: zodResolver(filtersAddressesSchema),
  });
  const { t } = useTranslate();

  const value = watch('address');

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
  )
}