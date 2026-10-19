import { BoxRowBetween, cn } from '@chillui/ui';
import { Box, Icon, String, Wrapper } from '@ludo/ui';

import { TIconsAll } from '@/constants/icons.constants';
import { GoBackButton } from '@/components/ui/navigation/header-go-back/components/go-back-button.component';

type AuthHeaderProps = {
  className?: string;
  hasGoBackButton?: boolean;
  mascotClassName?: string;
  mascotName: TIconsAll;
  title: string;
};

export const AuthHeader = (props: AuthHeaderProps) => {
  const { className, hasGoBackButton = true, mascotClassName, mascotName, title } = props;

  return (
    <Wrapper className={cn('overflow-hidden rounded-b-header bg-tertiary', className)} safeArea={['top']}>
      {hasGoBackButton && <GoBackButton />}
      <BoxRowBetween>
        <String font="secondaryExtraBold" className="mt-2 pb-2" variant="title-3">
          {title}
        </String>
        <Box className="justify-end">
          <Icon name={mascotName} className={cn('size-20', mascotClassName)} />
        </Box>
      </BoxRowBetween>
    </Wrapper>
  );
};
