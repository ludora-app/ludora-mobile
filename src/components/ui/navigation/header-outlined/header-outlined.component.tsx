import { ReactNode } from 'react';
import { useTranslate } from '@tolgee/react';
import { Box, BoxRowGrow, cn, OutlinedString, Wrapper, WrapperProps } from '@chillui/ui';

import COLORS from '@/constants/colors.contstants';
import { useSafeArea } from '@/hooks/safe-area.hook';
import GoBackButton from '@/components/ui/navigation/header-go-back/components/go-back-button.component';

export type HeaderOutlinedProps = {
  title?: string;
  titleKey?: string;
  hasTopSafeArea?: boolean;
  hasHorizontalPadding?: boolean;
  className?: string;
  outlinedStringWidth?: number;
  fontSize?: number;
  showBackButton?: boolean;
  rightContent?: ReactNode;
  px?: WrapperProps['px'];
  gap?: number;
};

export const HEADER_OUTLINED_HEIGHT = 50;

export default function HeaderOutlined(props: HeaderOutlinedProps) {
  const {
    className,
    fontSize = 28,
    gap = 8,
    hasHorizontalPadding,
    hasTopSafeArea = false,
    outlinedStringWidth,
    px,
    rightContent,
    showBackButton = true,
    title,
    titleKey,
  } = props;
  const { t } = useTranslate();
  const { safeTop } = useSafeArea();

  const displayTitle = titleKey ? t(titleKey) : title;

  if (!displayTitle) {
    return null;
  }

  return (
    <Wrapper
      px={px || (hasHorizontalPadding ? 'md' : 'none')}
      className={cn('z-10 flex-row items-center pb-2', className)}
      style={{ paddingTop: hasTopSafeArea ? safeTop : 0 }}
    >
      <BoxRowGrow className="items-center" style={{ gap }}>
        {showBackButton && <GoBackButton />}
        <Box className={cn({ 'mt-2': showBackButton })}>
          <OutlinedString
            text={displayTitle}
            fontSize={fontSize}
            width={outlinedStringWidth}
            fillColor="#FFFFFF"
            strokeColor={COLORS.primary}
            strokeWidth={2}
            fontFamily="NunitoSans700Bold"
          />
        </Box>
      </BoxRowGrow>
      {rightContent}
    </Wrapper>
  );
}
