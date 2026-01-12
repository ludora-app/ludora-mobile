import { useRouter } from 'expo-router';
import { BoxRow, IconButton, String } from '@ludo/ui';
import { BoxRowCenterBetween, cn, Icon, WrapperSafeAreaView } from '@chillui/ui';

import { TIconsAll } from '@/constants/ICONS';

type HeaderGoBackProps = {
  className?: string;
  title?: string;
  iconName?: TIconsAll;
};

export default function HeaderGoBack(props: HeaderGoBackProps) {
  const { className, iconName, title } = props;
  const router = useRouter();
  return (
    <WrapperSafeAreaView edges={['top']} fill={false} className={cn('py-3', className)}>
      <BoxRowCenterBetween>
        <BoxRow className="items-center gap-5">
          <IconButton
            iconName="arrow-left-regular"
            className="rounded-xl border-[1px] border-[#D8DADC] bg-transparent"
            iconColor="#000"
            as="scale-pressable"
            onPress={() => router.back()}
          />
          {!!title && (
            <String variant="title-1" font="primaryBold">
              {title}
            </String>
          )}
        </BoxRow>
        {!!iconName && <Icon name={iconName} className="size-16" />}
      </BoxRowCenterBetween>
    </WrapperSafeAreaView>
  );
}
