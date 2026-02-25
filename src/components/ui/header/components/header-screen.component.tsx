import { PropsWithChildren } from 'react';
import { cn, OutlinedString } from '@chillui/ui';
import { Box, Icon, IconProps, String } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';

interface HeaderProps {
  title?: string;
  subTitle?: string;
  className?: string;
  iconProps?: IconProps;
  hasNewSession?: boolean;
}

export default function HeaderScreen(props: PropsWithChildren<HeaderProps>) {
  const { children, className, hasNewSession = false, iconProps, subTitle, title } = props;

  return (
    <Box className={cn('h-56 flex-row items-end overflow-hidden', className)}>
      <Box className="flex-1 flex-row justify-center gap-4">
        <Box className="flex-1 gap-2 pb-3 justify-center">
          <Box className="-ml-1 -mb-3 w-full">
            <OutlinedString
              text={title}
              fontSize={32}
              fillColor="#FFFFFF"
              strokeColor={COLORS.primary}
              strokeWidth={2}
              fontFamily="NunitoSans700Bold"
            />
          </Box>
          <String colorVariant="white" font="primaryBold">
            {subTitle}
          </String>
          {children}
          {hasNewSession && (
            <Box className="absolute right-0 bottom-16">
              <Icon name="mascotte-ludora" className="size-36" />
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
