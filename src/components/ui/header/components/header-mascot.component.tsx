import { BoxRowBetween, cn } from '@chillui/ui';
import { Box, Icon, String, Wrapper } from '@ludo/ui';

import { TIconsAll } from '@/constants/icons.constants';

import { MascotHalo } from '../../mascot-halo';
import { GoBackButton } from '../../navigation/header-go-back/components/go-back-button.component';

type HeaderMascotProps = {
  className?: string;
  description?: string;
  hasGoBackButton?: boolean;
  hasMascotHalo?: boolean;
  mascotClassName?: string;
  mascotName: TIconsAll;
  title: string;
};

export const HeaderMascot = (props: HeaderMascotProps) => {
  const {
    className,
    description,
    hasGoBackButton = true,
    hasMascotHalo = false,
    mascotClassName,
    mascotName,
    title,
  } = props;

  return (
    <Wrapper className={cn('overflow-hidden rounded-b-header bg-tertiary', className)} safeArea={['top']}>
      {hasGoBackButton && <GoBackButton />}
      <BoxRowBetween>
        <Box className="mt-2 flex-1 pb-4">
          <String font="secondaryExtraBold" variant="title-3">
            {title}
          </String>
          {!!description && (
            <String variant="body-sm" font="primarySemiBold">
              {description}
            </String>
          )}
        </Box>
        <Box className="justify-end">
          {hasMascotHalo ? (
            <MascotHalo name={mascotName} size="sm" iconClassName={mascotClassName} />
          ) : (
            <Icon name={mascotName} className={cn('size-20', mascotClassName)} />
          )}
        </Box>
      </BoxRowBetween>
    </Wrapper>
  );
};
