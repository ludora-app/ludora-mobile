import { String, BoxRow } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { TIconsAll } from '@/constants/ICONS';

import SessionSectionIcon from './session-section-icon.component';
import { useSessionTeamStore } from '../../stores/session-team.store';

type SessionSectionsHeaderProps = {
  title: string;
  iconName: TIconsAll;
};

export default function SessionSectionHeader(props: SessionSectionsHeaderProps) {
  const sideTeam = useSessionTeamStore(state => state.sideTeam);
  const { t } = useTranslate();
  const { iconName, title } = props;

  return (
    <BoxRow className="items-center gap-1">
      <SessionSectionIcon sideTeam={sideTeam} name={iconName} size='md' />
      <String font="primaryBold" variant="body-3" useFastText={false}>
        {t(title)}
      </String>
    </BoxRow>
  );
}
