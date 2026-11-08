import { cn } from '@chillui/ui';
import { Box, String, Wrapper } from '@ludo/ui';

import { TIconsAll } from '@/constants/icons.constants';

import { MascotHalo, MascotHaloProps } from '../../mascot-halo';
import { GoBackButton } from '../../navigation/header-go-back/components/go-back-button.component';

type HeaderHeroProps = {
  className?: string;
  description?: string;
  hasGoBackButton?: boolean;
  isMascotAnimated?: boolean;
  mascotName: TIconsAll;
  mascotSize?: MascotHaloProps['size'];
  title?: string;
};

export const HeaderHero = (props: HeaderHeroProps) => {
  const {
    className,
    description,
    hasGoBackButton = true,
    isMascotAnimated = false,
    mascotName,
    mascotSize = 'lg',
    title,
  } = props;

  return (
    <Wrapper
      className={cn('items-center rounded-b-header bg-tertiary pb-7.5', className)}
      safeArea={hasGoBackButton ? ['top'] : ['top-4']}
    >
      {hasGoBackButton && <GoBackButton className="self-start" />}
      <MascotHalo name={mascotName} size={mascotSize} isAnimated={isMascotAnimated} />
      {(!!title || !!description) && (
        <Box className="mt-1.5 items-center gap-1.5">
          {!!title && (
            <String variant="title-1" className="text-center">
              {title}
            </String>
          )}
          {!!description && (
            <String font="primarySemiBold" className="text-center">
              {description}
            </String>
          )}
        </Box>
      )}
    </Wrapper>
  );
};
