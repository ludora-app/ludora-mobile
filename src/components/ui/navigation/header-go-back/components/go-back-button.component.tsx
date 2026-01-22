import { cn } from '@chillui/ui';
import { IconButton } from '@ludo/ui';
import { useRouter } from 'expo-router';

type GoBackButtonProps = {
  className?: string;
  onPress?: () => void;
};

export default function GoBackButton(props: GoBackButtonProps) {
  const { className, onPress } = props;
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      return onPress();
    }
    return router.back();
  };
  return (
    <IconButton
      iconName="arrow-left-regular"
      className={cn('rounded-xl border border-[#D8DADC] bg-white', className)}
      iconColor="#000"
      as="scale-pressable"
      onPress={handlePress}
    />
  );
}
