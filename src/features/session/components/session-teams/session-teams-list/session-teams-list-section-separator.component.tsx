import { Separator } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

export default function SessionTeamsListSectionSeparator() {
  const { t } = useTranslate();
  return (
    <Separator
      title={t('common.vs').toUpperCase()}
      className="my-5"
      titleProps={{
        font: 'primaryExtraBold',
        variant: 'body-3',
      }}
    />
  );
}
