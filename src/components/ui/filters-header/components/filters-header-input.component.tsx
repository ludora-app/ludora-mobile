import { StrictOmit } from '@chillui/ui';
import { useForm } from 'react-hook-form';
import { debounce, isString } from 'radash';
import { FormInput, FormInputProps } from '@ludo/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useRef } from 'react';

import { filtersHeaderInputSchema, FiltersHeaderInputSchema } from '../schemas/filters-header-input.schema';

export type FiltersHeaderInputProps<T extends FiltersHeaderInputSchema> = StrictOmit<
  FormInputProps<T>,
  'name' | 'onChange'
>;

export default function FiltersHeaderInput<T extends FiltersHeaderInputSchema>(props: FiltersHeaderInputProps<T>) {
  const { onChangeText, ...rest } = props;

  const { control, watch } = useForm<FiltersHeaderInputSchema>({
    resolver: zodResolver(filtersHeaderInputSchema),
  });
  const inputValue = watch('search');

  const handleSearch = useCallback(
    async (searchValue: string) => {
      onChangeText(searchValue);
    },
    [onChangeText],
  );

  const debouncedSearchRef = useRef(
    debounce({ delay: 300 }, (searchValue: string) => {
      handleSearch(searchValue);
    }),
  );

  useEffect(() => {
    if (isString(inputValue)) {
      debouncedSearchRef.current(inputValue);
    }
  }, [inputValue]);

  return (
    <FormInput
      leftIconAction={{
        color: '#000',
        name: 'search-regular',
      }}
      {...rest}
      name="search"
      control={control}
    />
  );
}
