import { Wrapper } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component';

import SessionTeamsList from '../components/session-teams/session-teams-list/session-teams-list.component';

export default function SessionTeamsFormSheet() {
  const { t } = useTranslate();
  return (
    <>
      <FormSheetHeader title={t('session.teams_header_title')} hasGoBack />
      <Wrapper fill>
        <SessionTeamsList />
      </Wrapper>
    </>
  );
}
