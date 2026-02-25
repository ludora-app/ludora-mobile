import { BoxCenter } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { LoadingIndicator } from '@/components/chill-ui-library';

export default function Loading() {
  return (
    <BoxCenter className="flex-1">
      <LoadingIndicator name="swing" color={COLORS.primary} size="xl" />
    </BoxCenter>
  );
}
