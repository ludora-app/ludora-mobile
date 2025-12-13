import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cn, Box } from '@chillui/ui';

interface BottomSheetFooterProps {
  footerClassName?: string;
  children: React.ReactNode;
}

export default function BottomSheetFooter({ children, footerClassName }: BottomSheetFooterProps) {
  const { bottom } = useSafeAreaInsets();
  return (
    <Box
      className={cn('absolute bottom-0 z-50 flex flex-row bg-white px-5 pt-5 shadow-lg', footerClassName)}
      style={{
        paddingBottom: bottom + 10,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.5,
      }}
    >
      {children}
    </Box>
  );
}
