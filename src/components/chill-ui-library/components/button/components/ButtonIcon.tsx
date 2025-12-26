import { Box } from '../../box';
import { Icon } from '../../icon';
import { cn } from '../../../utils';
import { twStyles } from '../styles/Button.styles';
import { useButtonContext } from '../context/ButtonContext';
import { IconConfig } from '../../icon/context/IconContext';
import { ButtonIconProps } from '../../../types/button.types';
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
export default function ButtonIcon<T extends IconConfig>({ className, name, ...props }: ButtonIconProps<T>) {
  const { sizingVariant } = useButtonContext();

  const content = name && <Icon<T> name={name} size={sizingVariant} {...props} />;

  if (!content) return null;

  return <Box className={cn(twStyles.pointerEventsNone, className)}>{content}</Box>;
}

ButtonIcon.displayName = 'ButtonIcon';
