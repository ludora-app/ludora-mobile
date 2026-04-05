import { BoxCenter } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { LoadingIndicator } from '@/components/chill-ui-library';

interface LoadingProps {
  loadingColor?: string;
}

export default function Loading(props: LoadingProps) {
  const { loadingColor = COLORS.primary } = props;

  return (
    <BoxCenter className="flex-1">
      <LoadingIndicator name="swing" color={loadingColor} size="xl" />
    </BoxCenter>
  );
}
