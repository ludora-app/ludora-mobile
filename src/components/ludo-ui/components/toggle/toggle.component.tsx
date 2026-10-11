import { Toggle as ToggleChillUi } from '@chillui/ui';

import COLORS from '@/constants/colors.contstants';

import { ToggleProps } from '../../types/toggle.types';

export default function Toggle(props: ToggleProps) {
  return (
    <ToggleChillUi
      thumbColorOff={COLORS.white}
      thumbColorOn={COLORS.white}
      trackColorOff={COLORS.switchTrackOff}
      {...props}
      trackColorOn={COLORS.primary}
    />
  );
}
