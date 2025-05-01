import { View } from 'react-native';
import COLORS from '@/constants/COLORS';

import { Icon } from '../icon';

interface LoadingIndicatorsProps {
  color?: string;
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function Spinner(props: LoadingIndicatorsProps) {
  const { color = COLORS.primary, size = 'md' } = props;
  return (
    <View className="animate-spin">
      <Icon variant="circle-notch-solid" color={color} size={size} />
    </View>
  );
}
