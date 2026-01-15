import { Wrapper } from '@ludo/ui';
import { PropsWithChildren } from 'react';

export default function HomeSessionListItemWrapper({ children }: PropsWithChildren) {
  return <Wrapper className="pb-6">{children}</Wrapper>;
}
