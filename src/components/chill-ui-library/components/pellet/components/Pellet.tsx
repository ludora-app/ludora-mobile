

import { Box } from '../../box';
import { cn } from '../../../utils';
import { pelletTv } from '../styles/Pellet.styles';
import { PelletProps } from '../../../types/pellet.types';
import { pelletDefaultProps } from '../utils/defaultProps';

/**
 * A simple Pellet component, representing a small colored dot or indicator.
 *
 * @example
 * ```tsx
 * <Pellet colorVariant="primary" size="sm" />
 * ```
 */
function Pellet(props: PelletProps) {
  const {
    className,
    colorVariant = pelletDefaultProps.colorVariant,
    isDisabled,
    size = pelletDefaultProps.size,
    style,
    variant = pelletDefaultProps.variant,
    ...rest
  } = props;

  return (
    <Box
      className={cn(
        pelletTv({
          colorVariant,
          isDisabled: !!isDisabled,
          size,
          variant,
        }),
        className,
      )}
      style={style}
      {...rest}
    />
  );
}

Pellet.displayName = 'Pellet';

export default Pellet;
