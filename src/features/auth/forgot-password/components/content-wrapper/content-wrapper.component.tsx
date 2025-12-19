import { Box } from '@chillui/ui';
import { PropsWithChildren } from 'react';

export default function ContentWapper(props: PropsWithChildren) {
  const { children } = props;
  return <Box className="my-10">{children}</Box>;
}
