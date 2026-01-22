import { Separator } from '@ludo/ui';

export default function SessionTeamsListSectionSeparator() {
  return (
    <Separator
      title="VS"
      className="my-5"
      titleProps={{
        colorVariant: 'primary',
        font: 'primaryExtraBold',
        variant: 'body-3',
      }}
    />
  );
}
