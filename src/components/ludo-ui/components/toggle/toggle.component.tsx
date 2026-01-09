import { Toggle as ToggleChillUi } from '@chillui/ui';

import COLORS from '@/constants/COLORS';

import { ToggleProps } from '../../types/toggle.types';

export default function Toggle(props: ToggleProps) {
  return <ToggleChillUi {...props} trackColorOn={COLORS.primary} />;
}
