import { Platform } from 'react-native';

import { Box } from '../box';
import { Icon } from '../icon';
import String from '../string/components/String';

interface BottomSheetHeaderProps {
  title: string;
  screen?: boolean;
  onClose: () => void;
  closeable?: boolean;
}

export default function BottomSheetHeader({ closeable = true, onClose, screen, title }: BottomSheetHeaderProps) {
  return (
    <Box className="elevation-lg relative z-50 bg-white py-4 shadow-md">
      {Platform.OS === 'ios' && screen && (
        <Box className="mb-3 flex h-2 w-full items-center justify-center">
          <Box className="h-1 w-12 rounded-full bg-ring" />
        </Box>
      )}
      <Box className="w-full flex-row items-center justify-center">
        {closeable && (
          <Box className="absolute left-4">
            <Icon variant="xmark-solid" wrapper onPress={onClose} />
          </Box>
        )}
        <String weight="bold" size="lg">
          {title}
        </String>
      </Box>
    </Box>
  );
}
