import { PropsWithChildren } from 'react';
import { Box, Icon, String } from '@ludo/ui';
import { OutlinedString, Wrapper } from '@chillui/ui';

import COLORS from '@/constants/COLORS';

interface HeaderProps {
  title?: string;
  subTitle?: string;
}

export const HEADER_HEIGHT = 210;

export default function Header(props: PropsWithChildren<HeaderProps>) {
  const { children, subTitle, title } = props;

  return (
    <Wrapper className="flex-row items-end" hasSafeArea edges={['top']} style={{ height: HEADER_HEIGHT }}>
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
              fontFamily="NunitoSans400Regular"
              fontWeight="900"
            />
          </Box>
          <String colorVariant="white" font="primaryBold">
            {subTitle}
          </String>
          {children}
        </Box>
        <Box className="justify-end">
          <Icon name="mascotte-ludora" className="size-36" />
        </Box>
      </Box>
    </Wrapper>
  );
}
