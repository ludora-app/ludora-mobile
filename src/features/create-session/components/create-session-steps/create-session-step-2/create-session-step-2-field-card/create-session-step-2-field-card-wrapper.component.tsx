import { PropsWithChildren } from 'react';

import { Wrapper } from '@/components/ludo-ui';

export default function CreateSessionStep2FieldCardWrapper({ children }: PropsWithChildren) {
  return <Wrapper px="none">{children}</Wrapper>;
}
