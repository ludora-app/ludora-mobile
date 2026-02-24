import { cn } from '@chillui/ui';
import { BoxRow, String, StringProps, Wrapper, Icon, BoxRowCenterBetween } from '@ludo/ui';

import { TIconsAll } from '@/constants/ICONS';
import { useSafeArea } from '@/hooks/safe-area.hook';

import GoBackButton from './go-back-button.component';

type HeaderGoBackProps = {
  className?: string;
  hasTopSafeArea?: boolean;
  title?: string;
  iconName?: TIconsAll;
  titleProps?: StringProps;
};

export default function HeaderGoBack(props: HeaderGoBackProps) {
  const { safeTop } = useSafeArea();
  const { className, hasTopSafeArea, iconName, title, titleProps } = props;

  return (
    <Wrapper style={{ paddingTop: hasTopSafeArea ? safeTop : 0 }} fill={false} className={cn('py-3', className)}>
      <BoxRowCenterBetween>
        <BoxRow className="items-center gap-5">
          <GoBackButton />
          {!!title && (
            <String variant="title-1" font="primaryBold" {...titleProps}>
              {title}
            </String>
          )}
        </BoxRow>
        {!!iconName && <Icon name={iconName} className="size-16" />}
      </BoxRowCenterBetween>
    </Wrapper>
  );
}
