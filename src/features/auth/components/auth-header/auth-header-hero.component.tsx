import { Box, Icon } from '@ludo/ui';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { TIconsAll } from '@/constants/icons.constants';
import { GoBackButton } from '@/components/ui/navigation/header-go-back/components/go-back-button.component';

type AuthHeaderHeroProps = {
  mascotName: TIconsAll;
};

export const AuthHeaderHero = (props: AuthHeaderHeroProps) => {
  const { mascotName } = props;
  const { safeTop } = useSafeArea();

  return (
    <Box className="rounded-b-header bg-tertiary px-5 pb-7.5" style={{ paddingTop: safeTop }}>
      <GoBackButton />
      <Box className="h-52.5 w-60 items-center justify-center self-center">
        <Box className="absolute size-52.5 rounded-full bg-tertiaryHalo" />
        <Icon name={mascotName} className="size-47.5" />
      </Box>
    </Box>
  );
};
