import { Wrapper } from '@ludo/ui';
import { PropsWithChildren } from 'react';

export default function HomeSessionListItemWrapper({ children }: PropsWithChildren) {
  return <Wrapper className="bg-background pb-6">{children}</Wrapper>;
}
