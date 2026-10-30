import { cn } from '@chillui/ui';
import { Pressable } from 'react-native';

import COLORS from '@/constants/colors.contstants';

import { Box } from '../box';
import { Icon } from '../icon';
import { String } from '../string';
import { AutocompleteItem, AutocompleteSuggestionProps } from '../../types/autocomplete.types';

export const AutocompleteSuggestion = <T extends AutocompleteItem>(props: AutocompleteSuggestionProps<T>) => {
  const { hasSeparator, item, itemIconName, onSelect } = props;

  return (
    <Pressable
      onPress={() => onSelect(item)}
      className={cn('min-h-13 flex-row items-center gap-3 px-4 py-2', { 'border-t-[1.5px] border-border': hasSeparator })}
    >
      {!!itemIconName && <Icon name={itemIconName} size="sm" color={COLORS.primary} />}
      <Box className="flex-1">
        <String font="primaryExtraBold" truncate>
          {item.label}
        </String>
        {!!item.description && (
          <String variant="body-sm" font="primarySemiBold" colorVariant="muted" truncate>
            {item.description}
          </String>
        )}
      </Box>
    </Pressable>
  );
};
