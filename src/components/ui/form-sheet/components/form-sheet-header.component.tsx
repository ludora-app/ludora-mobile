import { cn } from '@chillui/ui';
import { Box, String } from '@ludo/ui';
import { StyleSheet } from 'react-native';

import GoBackButton from '../../navigation/header-go-back/components/go-back-button.component';

type FormSheetHeaderProps = {
  title?: string;
  hasShadow?: boolean;
  hasGoBack?: boolean;
};

const styles = StyleSheet.create({
  shadox: {
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
});

export default function FormSheetHeader(props: FormSheetHeaderProps) {
  const { hasGoBack, hasShadow = true, title } = props;
  return (
    <Box collapsable={false} style={hasShadow ? styles.shadox : undefined}>
      <Box className="mx-auto mt-2 h-1 w-12 rounded-full bg-zinc-400" />
      <Box className={cn(hasGoBack && 'relative my-1 items-center justify-center')}>
        {hasGoBack && (
          <Box className="absolute left-3">
            <GoBackButton />
          </Box>
        )}
        {title && (
          <Box className="my-3 flex-row items-center justify-center">
            <String font="primaryBold" variant="body-3">
              {title}
            </String>
          </Box>
        )}
      </Box>
    </Box>
  );
}
