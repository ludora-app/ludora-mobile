import { Box, String } from '@ludo/ui';
import { BoxGrow, cn, WrapperProps } from '@chillui/ui';

import HeaderWrapper from './header-wrapper.component';
import GoBackButton from '../../navigation/header-go-back/components/go-back-button.component';

type HeaderProps = {
  title?: string;
  hasShadow?: boolean;
  hasGoBack?: boolean;
  className?: string;
  hasTopSafeArea?: boolean;
  px?: WrapperProps['px'];
  titlePosition?: 'center' | 'left';
};

export default function Header(props: HeaderProps) {
  const {
    className,
    hasGoBack = false,
    hasShadow = false,
    hasTopSafeArea = false,
    px,
    title,
    titlePosition = 'center',
  } = props;

  if (titlePosition === 'left') {
    return (
      <HeaderWrapper
        className={cn(hasGoBack && 'my-2 flex-row items-center gap-3', className)}
        hasTopSafeArea={hasTopSafeArea}
        hasShadow={hasShadow}
        px={px}
      >
        {hasGoBack && <GoBackButton />}
        {title && (
          <BoxGrow>
            <String font="primaryBold" variant="body-3">
              {title}
            </String>
          </BoxGrow>
        )}
      </HeaderWrapper>
    );
  }

  return (
    <HeaderWrapper className={className} hasTopSafeArea={hasTopSafeArea} hasShadow={hasShadow} px={px || 'none'}>
      <Box className={cn(hasGoBack && 'relative my-2 items-center justify-center')}>
        {hasGoBack && (
          <Box className="absolute left-3">
            <GoBackButton />
          </Box>
        )}
        {title && (
          <String font="primaryBold" variant="body-3" className="text-center">
            {title}
          </String>
        )}
      </Box>
    </HeaderWrapper>
  );
}
