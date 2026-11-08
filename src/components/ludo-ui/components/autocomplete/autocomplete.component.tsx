import { cn } from '@chillui/ui';
import { Keyboard } from 'react-native';

import COLORS from '@/constants/colors.contstants';

import { Input } from '../input';
import { Box, BoxRow } from '../box';
import { AutocompleteSuggestions } from './autocomplete-suggestions.component';
import { AutocompleteItem, AutocompleteProps } from '../../types/autocomplete.types';

/**
 * Search input with a suggestions list pushing the content below. Fetching and debouncing stay with the caller.
 * To float the suggestions over the content, position the whole Autocomplete absolutely: on Android a touch
 * outside a parent's bounds is lost, so the list must stay inside its own.
 */
export const Autocomplete = <T extends AutocompleteItem>(props: AutocompleteProps<T>) => {
  const {
    className,
    emptyLabelKey,
    inputContainerClassName,
    inputProps,
    isDropdownOpen = true,
    isLoading = false,
    itemIconName,
    items,
    minQueryLength = 1,
    onChangeQuery,
    onSelect,
    placeholder,
    query,
    rightContent,
  } = props;

  const isDropdownVisible = isDropdownOpen && query.trim().length >= minQueryLength;

  const handleSelect = (item: T) => {
    Keyboard.dismiss();
    onSelect(item);
  };

  const input = (
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
  );

  return (
    <Box className={cn('gap-1.5', className)}>
      {rightContent ? (
        <BoxRow className="items-center gap-2">
          <Box className="flex-1">{input}</Box>
          {rightContent}
        </BoxRow>
      ) : (
        input
      )}
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
