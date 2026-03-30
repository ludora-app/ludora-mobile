import { Icon, String } from '@ludo/ui';
import { StyleSheet } from 'react-native';
import { cn, ScalePressable } from '@chillui/ui';

import COLORS from '@/constants/colors.contstants';
import { TIconsAll } from '@/constants/icons.constants';

export interface QuickActionCardProps {
  label: string;
  isFlex?: boolean;
  className?: string;
  iconColor?: string;
  iconName: TIconsAll;
  hasShadow?: boolean;
  onPress?: () => void;
  variant?: 'vertical' | 'horizontal';
}

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0 2px 4px #F1592440',
  },
});

export default function QuickActionCard(props: QuickActionCardProps) {
  const {
    className,
    hasShadow = false,
    iconColor = COLORS.primary,
    iconName,
    isFlex = true,
    label,
    onPress,
    variant = 'vertical',
  } = props;

  return (
    <ScalePressable
      className={cn(
        'items-center gap-2 rounded-xl border border-primary/20 p-3',
        variant === 'horizontal' ? 'flex-row' : 'flex-col',
        { 'flex-1': isFlex },
        className,
      )}
      onPress={onPress}
      style={hasShadow ? styles.shadow : undefined}
    >
      <Icon name={iconName} color={iconColor} />
      <String truncate>{label}</String>
    </ScalePressable>
  );
}
