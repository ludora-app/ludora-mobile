import { useTranslate } from '@tolgee/react';

import QuickActionCard from '@/components/ui/quick-action-card.component';

interface ChatRoomUserProfileReportUserProps {
  onPress: () => void;
}

export default function ChatRoomUserProfileReportUser(props: ChatRoomUserProfileReportUserProps) {
  const { onPress } = props;
  const { t } = useTranslate();

  return (
    <QuickActionCard
      iconName="shield-excalmation-solid"
      label={t('profil.report_user_button_label')}
      onPress={onPress}
      variant="horizontal"
      hasShadow
    />
  );
}
