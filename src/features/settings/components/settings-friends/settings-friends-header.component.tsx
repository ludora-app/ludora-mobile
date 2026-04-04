import { memo } from 'react';

import SettingsHeader from '@/features/settings/components/settings-header.component';

function SettingsFriendsHeader() {
  return <SettingsHeader titleKey="settings.friends.header_title" className="mb-4" />;
}

export default memo(SettingsFriendsHeader);
