import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box } from '@chillui/ui';
import { BottomSheetProps } from '../utils/types';
import BottomSheetHeader from './BottomSheetHeader';
import BottomSheetFooter from './BottomSheetFooter';

export default function BottomSheetIos(props: BottomSheetProps) {
  const { children, closeable, footer, footerClassName, screen, showHeader = true, title } = props;

  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  return (
    <Box className="flex-1">
      {showHeader && (
        <BottomSheetHeader title={title} closeable={closeable} onClose={() => router.back()} screen={screen} />
      )}
      <ScrollView
        contentContainerClassName="bg-white flex-grow"
        contentContainerStyle={{ ...(footer ? { paddingBottom: bottom + 80 } : { paddingBottom: bottom }) }}
      >
        {children}
      </ScrollView>
      {footer && <BottomSheetFooter footerClassName={footerClassName}>{footer}</BottomSheetFooter>}
    </Box>
  );
}
