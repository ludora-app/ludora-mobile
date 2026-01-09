import { FormInput } from '@ludo/ui';
import { useForm } from 'react-hook-form';
import { debounce, isString } from 'radash';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useRef } from 'react';

import { useCreateSessionFiltersFieldsStore } from '@/features/create-session/store/create-session-filters-fields.store';
import {
  createSessionStep2FieldsListHeaderInputSchema,
  CreateSessionStep2FieldsListHeaderInputSchema,
} from '@/features/create-session/schemas/create-session-step-2-fields-list-header-input.schema';

export default function CreateSessionStep2FieldsListHeaderInput() {
  const { t } = useTranslate();
  const { setFilters } = useCreateSessionFiltersFieldsStore();
  const { control, watch } = useForm<CreateSessionStep2FieldsListHeaderInputSchema>({
    resolver: zodResolver(createSessionStep2FieldsListHeaderInputSchema),
  });
  const inputValue = watch('search');

  const handleSearch = useCallback(
    async (searchValue: string) => {
      setFilters({ search: searchValue });
    },
    [setFilters],
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
      name="search"
      control={control}
      placeholder={t('create-session-steps.step-2.fields_list_header_input.placeholder')}
    />
  );
}
