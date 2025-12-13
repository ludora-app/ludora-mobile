import { PropsWithChildren, useState } from 'react';

import { Box } from '../../box';
import { Icon } from '../../icon';
import { cn } from '../../../utils/cn';
import { ChilluiDevToolProps } from '../../../types';
import { chilluiDevToolsTv } from '../styles/ChilluiDevTools.styles';

export default function ChilluiDevToolAction(props: PropsWithChildren<ChilluiDevToolProps>) {
  const { children, className, handleToggleStorybook, position = 'bottom', side = 'right', style } = props;

  const [Btnposition, setBtnPosition] = useState<'top' | 'bottom'>(position);

  const handleTogglePosition = () => {
    setBtnPosition(Btnposition === 'bottom' ? 'top' : 'bottom');
  };

  return (
    <>
      <Box className={cn(chilluiDevToolsTv({ position: Btnposition, side }), className)} style={style}>
        <Icon name="book-open-solid" size="sm" hasPressEffect onPress={handleToggleStorybook} color="#fff" />
        <Icon
          name={Btnposition === 'bottom' ? 'arrow-up-regular' : 'arrow-down-regular'}
          size="sm"
          onPress={handleTogglePosition}
          color="#fff"
        />
      </Box>
      {children}
    </>
  );
}
