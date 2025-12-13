import { Box } from '../../box';
import { Icon } from '../../icon';
import { cn } from '../../../utils';
import { useButtonContext } from '../context/ButtonContext';
import { ButtonIconProps } from '../../../types/button.types';
import { IconPositionTv, twStyles } from '../styles/Button.styles';
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
export default function ButtonIcon<T>({ className, name, position = 'inline', ...props }: ButtonIconProps<T>) {
  const { sizingVariant } = useButtonContext();

  const positionClass = position !== 'inline' ? IconPositionTv({ isAbsolute: false, position }) : '';

  const content = name && <Icon name={name} size={sizingVariant} {...props} />;

  if (!content) return null;

  return <Box className={cn(positionClass, twStyles.pointerEventsNone, className)}>{content}</Box>;
}

ButtonIcon.displayName = 'ButtonIcon';
