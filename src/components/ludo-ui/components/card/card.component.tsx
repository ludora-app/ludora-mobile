import { StyleSheet } from 'react-native';
import { cn, ScalePressable } from '@chillui/ui';

import { Box } from '../box';
import { CardProps } from '../../types/card.types';

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 6px 16px -8px rgba(51, 49, 50, 0.25)',
  },
});

export const Card = (props: CardProps) => {
  const { children, className, isSelected = false, onPress, style } = props;

  const cardClassName = cn(
    'gap-3 rounded-card border-2 border-transparent bg-white p-4',
    { 'border-primary/40 bg-primarySoft': isSelected },
    className,
  );
  const cardStyle = [!isSelected && styles.shadow, style];

  if (onPress) {
    return (
      <ScalePressable onPress={onPress} className={cardClassName} style={cardStyle}>
        {children}
      </ScalePressable>
    );
  }

  return (
    <Box className={cardClassName} style={cardStyle}>
      {children}
    </Box>
  );
};
