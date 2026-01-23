import { OutlinedString } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { Box, BoxAbsolute, Icon } from '@ludo/ui';

import COLORS from '@/constants/COLORS';

export default function SessionSectionTeamsCardVs() {
  const { t } = useTranslate();
  return (
    <BoxAbsolute className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1">
      <Icon name="lightning-solid-colors" color={COLORS.primary} className="size-14" />
      <Box className="flex-row">
        <OutlinedString
          text={t('V').toUpperCase()}
          fontSize={20}
          fillColor="#FFF"
          strokeColor={COLORS.primary}
          strokeWidth={2}
          fontFamily="NunitoSans700Bold"
          className='-mr-0.5'

        />
        <OutlinedString
          text={t('S').toUpperCase()}
          fontSize={20}
          fillColor="#FFF"
          strokeColor={COLORS.secondary}
          strokeWidth={2}
          fontFamily="NunitoSans700Bold"

        />
      </Box>
    </BoxAbsolute>
  );
}
