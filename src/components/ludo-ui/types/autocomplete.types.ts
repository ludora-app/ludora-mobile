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
  isLoading?: boolean;
  itemIconName?: IconProps['name'];
  items: T[];
  minQueryLength?: number;
  onChangeQuery: (query: string) => void;
  onSelect: (item: T) => void;
  placeholder?: string;
  query: string;
};

export type AutocompleteSuggestionsProps<T extends AutocompleteItem> = Pick<
  AutocompleteProps<T>,
  'emptyLabelKey' | 'isLoading' | 'itemIconName' | 'items' | 'onSelect'
>;

export type AutocompleteSuggestionProps<T extends AutocompleteItem> = Pick<
  AutocompleteProps<T>,
  'itemIconName' | 'onSelect'
> & {
  hasSeparator: boolean;
  item: T;
};
