import { cn } from '@chillui/ui';
import { Box, Icon, String } from '@ludo/ui';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { TIconsAll } from '@/constants/icons.constants';
import { GoBackButton } from '@/components/ui/navigation/header-go-back/components/go-back-button.component';

type AuthHeaderProps = {
  className?: string;
  mascotClassName?: string;
  mascotName: TIconsAll;
  title: string;
};

export const AuthHeader = (props: AuthHeaderProps) => {
  const { className, mascotClassName, mascotName, title } = props;
  const { safeTop } = useSafeArea();

  return (
    <Box
      className={cn('overflow-hidden rounded-b-header bg-tertiary px-5 pb-6.5', className)}
      style={{ paddingTop: safeTop }}
    >
      <GoBackButton />
      <String font="secondaryExtraBold" className="mt-2" variant="title-3">
        {title}
      </String>
      <Icon name={mascotName} className={cn('absolute right-4.5 -bottom-1 size-26', mascotClassName)} />
    </Box>
  );
};
