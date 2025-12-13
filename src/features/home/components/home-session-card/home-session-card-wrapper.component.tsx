import { PropsWithChildren } from 'react';

import { Wrapper } from '@/components/ludo-ui';

export default function HomeSessionCardWrapper({ children }: PropsWithChildren) {
  return <Wrapper className="pb-6">{children}</Wrapper>;
}
