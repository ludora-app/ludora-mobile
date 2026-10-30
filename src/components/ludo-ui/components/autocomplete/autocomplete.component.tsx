import { cn } from '@chillui/ui';
import { Keyboard } from 'react-native';

import COLORS from '@/constants/colors.contstants';

import { Box } from '../box';
import { Input } from '../input';
import { AutocompleteSuggestions } from './autocomplete-suggestions.component';
import { AutocompleteItem, AutocompleteProps } from '../../types/autocomplete.types';

/**
 * Search input with an inline suggestions list. Fetching and debouncing stay with the caller.
 */
export const Autocomplete = <T extends AutocompleteItem>(props: AutocompleteProps<T>) => {
  const {
    className,
    emptyLabelKey,
    inputContainerClassName,
    inputProps,
    isLoading = false,
    itemIconName,
    items,
    minQueryLength = 1,
    onChangeQuery,
    onSelect,
    placeholder,
    query,
  } = props;

  const isDropdownVisible = query.trim().length >= minQueryLength;

  const handleSelect = (item: T) => {
    Keyboard.dismiss();
    onSelect(item);
  };

  return (
    <Box className={cn('gap-1.5', className)}>
      <Input
        leftIconAction={{ color: `${COLORS.dark}99`, name: 'search-regular', size: 'md' }}
        {...inputProps}
        inputContainerClassName={cn('rounded-2xl px-4', inputContainerClassName)}
        inputFieldProps={{
          autoCorrect: false,
          placeholder,
          returnKeyType: 'search',
          ...inputProps?.inputFieldProps,
          onChangeText: onChangeQuery,
          value: query,
        }}
      />
      {isDropdownVisible && (
        <AutocompleteSuggestions
          items={items}
          isLoading={isLoading}
          itemIconName={itemIconName}
          emptyLabelKey={emptyLabelKey}
          onSelect={handleSelect}
        />
      )}
    </Box>
  );
};
