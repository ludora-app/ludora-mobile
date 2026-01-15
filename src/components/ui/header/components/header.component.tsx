import { PropsWithChildren } from 'react';
import { Box, Icon, String } from '@ludo/ui';
import { cn, OutlinedString, WrapperSafeAreaView } from '@chillui/ui';

import COLORS from '@/constants/COLORS';

interface HeaderProps {
  title?: string;
  subTitle?: string;
  className?: string;
  hasNewSession?: boolean;
}

export default function Header(props: PropsWithChildren<HeaderProps>) {
  const { children, className, hasNewSession = false, subTitle, title } = props;

  return (
    <WrapperSafeAreaView className={cn('flex-row items-end pt-10', className)} edges={['top']} style={{ height: 210 }}>
      <Box className="flex-1 flex-row justify-center gap-4">
        <Box className="flex-1 gap-2 pb-3">
          <Box className="-mb-3 w-full">
            <OutlinedString
              text={title}
              fontSize={32}
              width={350}
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
            <Box className="absolute bottom-16 right-0 -z-10">
              <Icon name="mascotte-ludora" className="size-36" />
            </Box>
          )}
        </Box>
        {!hasNewSession && (
          <Box className="justify-end">
            <Icon name="mascotte-ludora" className="size-36" />
          </Box>
        )}
      </Box>
    </WrapperSafeAreaView>
  );
}
