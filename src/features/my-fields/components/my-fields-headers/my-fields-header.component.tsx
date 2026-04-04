import { memo } from 'react';

import { HeaderOutlined } from '@/components/ui/navigation/header-outlined';

type MyFieldsHeaderProps = {
  titleKey: string;
};

function MyFieldsHeader(props: MyFieldsHeaderProps) {
  const { titleKey } = props;

  if (!titleKey) {
    return null;
  }

  return <HeaderOutlined titleKey={titleKey} />;
}

export default memo(MyFieldsHeader);
