import { padelStadium } from 'assets';
import { Pressable } from 'react-native';
import getUserInitials from '@/utils/user';
import { tv, VariantProps } from 'tailwind-variants';

import cn from '../cn/cn';
import Box from '../box/Box';
import { Image } from '../image/Image';
import String from '../string/components/String';
import { AvatarProps as props } from '../utils/types';

const sizeVariant = tv({
  base: 'size-9',
  variants: {
    size: {
      '2xl': 'size-28',
      '2xs': 'size-6',
      '3xl': 'size-32',
      lg: 'size-16',
      md: 'size-14',
      sm: 'size-12',
      xl: 'size-20',
      xs: 'size-9',
    },
  },
});

const avatarVariants = tv({
  variants: {
    variant: {
      circle: 'rounded-full',
      square: 'rounded-lg',
    },
  },
});

type AvatarProps = props & VariantProps<typeof avatarVariants> & VariantProps<typeof sizeVariant>;

export default function Avatar({ className, onPress, size = 'sm', userData, variant = 'circle' }: AvatarProps) {
  const initials = getUserInitials(userData);

  const image = userData?.image_url;

  if (!onPress) {
    return (
      <Box
        className={cn(
          'items-center justify-center overflow-hidden border border-white bg-primary',
          sizeVariant({ size }),
          avatarVariants({ variant }),
          className,
        )}
      >
        <String size={size} weight="semiBold" variant="white">
          {initials}
        </String>
        <Image className="absolute h-full w-full" source={padelStadium} />
      </Box>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'items-center justify-center overflow-hidden border border-white bg-primary',
        sizeVariant({ size }),
        avatarVariants({ variant }),
        className,
      )}
    >
      <String size={size} weight="semiBold" variant="white">
        {initials}
      </String>
      <Image className="absolute h-full w-full" source={image ?? ''} />
    </Pressable>
  );
}
