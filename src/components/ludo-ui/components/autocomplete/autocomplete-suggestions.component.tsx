import { StyleSheet } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { LoadingIndicator } from '@chillui/ui';

import COLORS from '@/constants/colors.contstants';

import { Box } from '../box';
import { String } from '../string';
import { AutocompleteSuggestion } from './autocomplete-suggestion.component';
import { AutocompleteItem, AutocompleteSuggestionsProps } from '../../types/autocomplete.types';

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 14px 28px -12px rgba(51, 49, 50, 0.35)',
  },
});

export const AutocompleteSuggestions = <T extends AutocompleteItem>(props: AutocompleteSuggestionsProps<T>) => {
  const { emptyLabelKey = 'common.no_result_found', isLoading, itemIconName, items, onSelect } = props;
  const { t } = useTranslate();

  const hasItems = items.length > 0;

  return (
    <Box className="overflow-hidden rounded-2xl border border-border bg-white" style={styles.shadow}>
      {isLoading && !hasItems && (
        <Box className="min-h-13 items-center justify-center">
          <LoadingIndicator name="swing" color={COLORS.primary} />
        </Box>
      )}
      {!isLoading && !hasItems && (
        <Box className="min-h-13 justify-center px-4">
          <String font="primarySemiBold" colorVariant="muted">
            {t(emptyLabelKey)}
          </String>
        </Box>
      )}
      {items.map((item, index) => (
        <AutocompleteSuggestion
          key={item.id}
          item={item}
          itemIconName={itemIconName}
          onSelect={onSelect}
          hasSeparator={index > 0}
        />
      ))}
    </Box>
  );
};
