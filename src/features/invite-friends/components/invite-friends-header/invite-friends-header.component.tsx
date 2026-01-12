import { String, Wrapper } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

export default function InviteFriendsHeader() {
  const { t } = useTranslate();
  return (
    <Wrapper fill={false}>
      <String colorVariant="muted">{t('invite-friends.header_title')}</String>
    </Wrapper>
  );
}
