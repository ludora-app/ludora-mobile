import { cn } from '@chillui/ui';
import { Share, Alert } from 'react-native';
import { IconButton, IconButtonProps } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';

type ShareButtonProps = {
  message: string;
  title: string;
  url: string;
  iconButtonProps?: Omit<IconButtonProps, 'iconName'>;
};

export default function ShareButton(props: ShareButtonProps) {
  const { iconButtonProps, message, title, url } = props;
  const handleShare = async () => {
    try {
      await Share.share({
        message,
        title,
        url,
      });
    } catch {
      Alert.alert('Oups', "Impossible d'ouvrir le partage.");
    }
  };
  return (
    <IconButton
      as="scale-pressable"
      onPress={handleShare}
      iconName="share-solid"
      variant="outlined"
      iconColor={COLORS.primary}
      className={cn('rounded-full p-3', iconButtonProps?.className)}
      {...iconButtonProps}
    />
  );
}
