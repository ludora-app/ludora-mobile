import { memo } from 'react';

import { HeaderOutlined, HeaderOutlinedProps } from '@/components/ui/navigation/header-outlined';

type SettingsHeaderProps = Pick<
  HeaderOutlinedProps,
  'titleKey' | 'hasTopSafeArea' | 'hasHorizontalPadding' | 'className' | 'outlinedStringWidth'
>;

function SettingsHeader(props: SettingsHeaderProps) {
  return <HeaderOutlined {...props} />;
}

export default memo(SettingsHeader);
