import { cn } from '@chillui/ui';
import { StyleSheet } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, Image, String } from '@ludo/ui';

import { getSportImage } from '@/utils/sports.utils';

import { WelcomePreviewMatch } from '../../constants/welcome.constants';

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 8px 18px -12px rgba(51, 49, 50, 0.3)',
  },
});

type WelcomeMatchesPreviewCardProps = {
  match: WelcomePreviewMatch;
};

export const WelcomeMatchesPreviewCard = (props: WelcomeMatchesPreviewCardProps) => {
  const { match } = props;
  const { t } = useTranslate();

  return (
    <BoxRow
      className={cn('items-center gap-3 rounded-card border border-border bg-white px-3.5 py-3', {
        'opacity-60': match.isFaded,
      })}
      style={styles.shadow}
    >
      <Box className="size-14 items-center justify-center rounded-field bg-tertiarySoft">
        <Image source={getSportImage(match.sport)} contentFit="contain" className="size-9.5" />
      </Box>
      <Box className="flex-1 gap-0.5">
        <String font="secondaryExtraBold" className="text-lg leading-6" truncate>
          {t(match.titleKey)}
        </String>
        <String className="text-dark/80" truncate variant="body-sm">
          {t(match.placeKey)}
        </String>
      </Box>
      <Box className="rounded-button-sm bg-dark px-2.5 py-1.25">
        <String font="primaryExtraBold" colorVariant="white" variant="body-sm">
          {match.spots}
        </String>
      </Box>
    </BoxRow>
  );
};
