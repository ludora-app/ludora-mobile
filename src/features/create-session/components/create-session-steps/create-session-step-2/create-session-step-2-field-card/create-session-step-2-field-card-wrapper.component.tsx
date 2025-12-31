import { PropsWithChildren } from 'react';

import { Wrapper } from '@/components/ludo-ui';

export default function CreateSessionStep2FieldCardWrapper({ children }: PropsWithChildren) {
  return (
    <Wrapper className="pb-6" px="none">
      {children}
    </Wrapper>
  );
}
