import { Box, BoxRow, Icon, Skeleton, String } from '@ludo/ui';

import { TIconsAll } from '@/constants/icons.constants';
import { MascotHalo } from '@/components/ui/mascot-halo';

type HomeHeaderGreetingProps = {
  /** Ludo's bubble, in place of the subtitle (first visit only). */
  bubble?: { mascotName: TIconsAll; text: string } | null;
  isSubtitleLoading: boolean;
  isTitleLoading: boolean;
  subtitle: string;
  title: string;
};

/** "Salut Camille !" with the subtitle and the mascot, or with Ludo speaking in a bubble. */
export const HomeHeaderGreeting = (props: HomeHeaderGreetingProps) => {
  const { bubble, isSubtitleLoading, isTitleLoading, subtitle, title } = props;

  const titleElement = isTitleLoading ? (
    <Skeleton variant="text" className="mb-2 w-44" size="lg" />
  ) : (
    <String variant="title-2" font="secondaryExtraBold" truncate>
      {title}
    </String>
  );

  if (bubble) {
    return (
      <Box className="gap-3">
        {titleElement}
        <BoxRow className="items-center gap-3">
          <MascotHalo name={bubble.mascotName} size="sm" isAnimated />
          <Box className="flex-1 rounded-card bg-white px-4 py-3">
            <String variant="body-1" font="secondaryExtraBold">
              {bubble.text}
            </String>
          </Box>
        </BoxRow>
      </Box>
    );
  }

  return (
    <BoxRow className="items-center gap-3">
      <Box className="flex-1 gap-1">
        {titleElement}
        {isSubtitleLoading ? (
          <Skeleton variant="text" className="w-56" />
        ) : (
          <String font="primarySemiBold">{subtitle}</String>
        )}
      </Box>
      <Icon name="mascotte-ludora" className="size-24" />
    </BoxRow>
  );
};
