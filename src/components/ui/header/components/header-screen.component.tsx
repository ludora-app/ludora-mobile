import { PropsWithChildren } from 'react';
import { cn, OutlinedString } from '@chillui/ui';
import { Box, Icon, IconProps, Skeleton, String } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';

interface HeaderProps {
  title?: string;
  subTitle?: string;
  className?: string;
  hasNewSession?: boolean;
  isTitleLoading?: boolean;
  leftContentClassName?: string;
  iconProps?: Partial<IconProps>;
}

export default function HeaderScreen(props: PropsWithChildren<HeaderProps>) {
  const { children,
    className,
    hasNewSession = false,
    iconProps,
    isTitleLoading,
    leftContentClassName,
    subTitle,
    title,
  } = props;

  return (
    <Box className={cn('flex-row overflow-hidden', className)}>
      <Box className="flex-1 flex-row justify-center gap-4">
        <Box className={cn("flex-1 gap-2 pb-3 justify-center", leftContentClassName)}>
          <Box className="-ml-1 -mb-3 w-full">
            {isTitleLoading ? (
              <Skeleton variant="text" className='mb-3 w-44' size="lg" />
            ) : (
              <OutlinedString
                text={title}
                fontSize={32}
                fillColor="#FFFFFF"
                strokeColor={COLORS.primary}
                strokeWidth={2}
                fontFamily="NunitoSans700Bold"
              />
            )}
          </Box>
          <String colorVariant="white" font="primaryBold">
            {subTitle}
          </String>
          {children}
          {hasNewSession && (
            <Box className="absolute right-0 bottom-16">
              <Icon name="mascotte-ludora" className="size-36" {...iconProps} />
            </Box>
          )}
        </Box>
        {!hasNewSession && (
          <Box className="justify-end">
            <Icon name="mascotte-ludora" className="size-36" {...iconProps} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
