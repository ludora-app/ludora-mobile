import { String } from '@ludo/ui';

import { FindOneSessionResponseData } from '@/api/generated/model';

type SessionTitleSectionProps = {
  title: FindOneSessionResponseData['title'];
};

export default function SessionTitleSection(props: SessionTitleSectionProps) {
  const { title } = props;

  return (
    <String font="primaryBold" variant="body-2">
      {title}
    </String>
  );
}
