import { cn } from '@chillui/ui';
import { IconButton } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { useAppNavigation } from '@/hooks/navigation.hooks';

type GoBackButtonProps = {
  className?: string;
  onPress?: () => void;
};

export const GoBackButton = (props: GoBackButtonProps) => {
  const { className, onPress } = props;
  const { goBack } = useAppNavigation();

  const handlePress = () => {
    if (onPress) {
      return onPress();
    }
    return goBack();
  };

  return (
    <IconButton
      iconName="arrow-left-regular"
      className={cn('border border-border bg-white', className)}
      iconColor={COLORS.dark}
      as="scale-pressable"
      onPress={handlePress}
      size="lg"
      rounded="circle"
    />
  );
};
