import { ChipIconProps } from '@/components/chill-ui-library/types';

import { Box } from '../../box';
import { Icon } from '../../icon';
import { cn } from '../../../utils';
import { twStyles } from '../styles/Chip.styles';
import { useChipContext } from '../context/ChipContext';
import { IconConfig } from '../../icon/context/IconContext';
/**
 * ButtonIcon component for rendering icons within a Button.
 * Automatically inherits sizing from Button context.
 *
 * @example
 * ```tsx
 * <Button>
 *   <ButtonIcon name="arrow-left-solid" position="left" />
 *   <ButtonTitle>Back</ButtonTitle>
 * </Button>
 * ```
 */
export default function ChipIcon<T extends IconConfig>({ className, name, ...props }: ChipIconProps<T>) {
  const { sizingVariant } = useChipContext();

  const content = name && <Icon<T> name={name} size={sizingVariant} {...props} />;

  if (!content) return null;

  return <Box className={cn(twStyles.pointerEventsNone, className)}>{content}</Box>;
}

ChipIcon.displayName = 'ChipIcon';
