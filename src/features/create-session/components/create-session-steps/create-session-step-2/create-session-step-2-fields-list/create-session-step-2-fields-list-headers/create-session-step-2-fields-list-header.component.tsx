import { useTranslate } from '@tolgee/react';

import CreateSessionTitle from '@/features/create-session/components/create-session-title-component';

export default function CreateSessionStep2FieldsListHeader() {
  const { t } = useTranslate();
  return <CreateSessionTitle title={t('create-session-steps-step-2.title')} />;
}
