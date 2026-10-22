import { cn } from '@chillui/ui';
import { Box, String } from '@ludo/ui';

import { GoBackButton } from '../../navigation/header-go-back/components/go-back-button.component';

type FormSheetHeaderProps = {
  title?: string;
  hasGoBack?: boolean;
  goBackAction?: () => void;
};

export const FormSheetHeader = (props: FormSheetHeaderProps) => {
  const { goBackAction, hasGoBack, title } = props;

  return (
    <Box collapsable={false}>
      <Box className="mx-auto h-1.5 w-11 rounded-full bg-border" />
      <Box className={cn(hasGoBack && 'relative my-1 items-center justify-center')}>
        {hasGoBack && (
          <Box className="absolute left-3">
            <GoBackButton onPress={goBackAction} />
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
};

FormSheetHeader.displayName = 'FormSheetHeader';
