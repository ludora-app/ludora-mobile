import { BoxCenter } from '@ludo/ui';
import { LoadingIndicator } from '@chillui/ui';

import COLORS from '@/constants/colors.contstants';

type LoadingProps = {
  loadingColor?: string;
};

export const Loading = (props: LoadingProps) => {
  const { loadingColor = COLORS.primary } = props;

  return (
    <BoxCenter className="flex-1">
      <LoadingIndicator name="swing" color={loadingColor} size="xl" />
    </BoxCenter>
  );
};
