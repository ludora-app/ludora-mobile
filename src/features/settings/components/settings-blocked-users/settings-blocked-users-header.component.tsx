import { memo } from 'react';

import SettingsHeader from '@/features/settings/components/settings-header.component';

function SettingsBlockedUsersHeader() {
  return <SettingsHeader titleKey="settings.blocked_users.header_title" className="mb-4" />;
}

export default memo(SettingsBlockedUsersHeader);
