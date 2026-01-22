import { cn, } from '@chillui/ui';
import { BoxRow, String, StringProps, WrapperSafeAreaView, Icon, BoxRowCenterBetween } from '@ludo/ui';

import { TIconsAll } from '@/constants/ICONS';

import GoBackButton from './go-back-button.component';

type HeaderGoBackProps = {
  className?: string;
  title?: string;
  iconName?: TIconsAll;
  titleProps?: StringProps;
};

export default function HeaderGoBack(props: HeaderGoBackProps) {
  const { className, iconName, title, titleProps } = props;

  return (
    <WrapperSafeAreaView edges={['top']} fill={false} className={cn('py-3', className)}>
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
    </WrapperSafeAreaView>
  );
}
