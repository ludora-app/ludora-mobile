import { ReactNode } from 'react';

import { IconProps } from './icon.types';
import { InputProps } from './input.types';

export type AutocompleteItem = {
  description?: string;
  id: string;
  label: string;
};

export type AutocompleteProps<T extends AutocompleteItem> = {
  className?: string;
  emptyLabelKey?: string;
  inputContainerClassName?: string;
  inputProps?: InputProps;
  /** `false` hides the suggestions whatever the query, e.g. after a tap outside. */
  isDropdownOpen?: boolean;
  isLoading?: boolean;
  itemIconName?: IconProps['name'];
  items: T[];
  minQueryLength?: number;
  onChangeQuery: (query: string) => void;
  onSelect: (item: T) => void;
  placeholder?: string;
  query: string;
  /** Next to the input, e.g. a button: the suggestions span under it too. */
  rightContent?: ReactNode;
};

export type AutocompleteSuggestionsProps<T extends AutocompleteItem> = Pick<
  AutocompleteProps<T>,
  'emptyLabelKey' | 'isLoading' | 'itemIconName' | 'items' | 'onSelect'
> & {
  className?: string;
};

export type AutocompleteSuggestionProps<T extends AutocompleteItem> = Pick<
  AutocompleteProps<T>,
  'itemIconName' | 'onSelect'
> & {
  hasSeparator: boolean;
  item: T;
};
