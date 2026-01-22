import { useTranslate } from '@tolgee/react';
import { String, BoxRow, Icon } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { TIconsAll } from '@/constants/ICONS';

type SessionSectionsHeaderProps = {
  title: string;
  iconName: TIconsAll;
};

export default function SessionSectionHeader(props: SessionSectionsHeaderProps) {
  const { t } = useTranslate();
  const { iconName, title } = props;

  return (
    <BoxRow className="items-center gap-1">
      <Icon name={iconName} color={COLORS.primary} />
      <String font="primaryBold" variant="body-3" useFastText={false}>
        {t(title)}
      </String>
    </BoxRow>
  );
}
