import { PropsWithChildren, ReactElement } from 'react';

import { Box } from '../../box';
import SeparatorDivider from './SeparatorDivider';
import SeparatorContent from './SeparatorContent';
import { cloneElement, cn, extractPropFromComponent, getChildByType } from '../../../utils';
import { SeparatorContentProps, SeparatorDividerProps, SeparatorProps } from '../../../types';

/**
 * The `<Separator />` component displays a horizontal line for visual separation.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Separator, SeparatorContent, SeparatorDivider } from '@chillui/ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <Separator >
 * <SeparatorDivider />
 * <SeparatorContent position="center"><Text>Or</Text></SeparatorContent>
 * </Separator>
 * ```
 *
 * @param className - Custom CSS classes for styling the separator
 * @param viewProps - Rest of the view props
 */
export default function Separator(props: PropsWithChildren<SeparatorProps>) {
  const { children, className, ...rest } = props;

  const separatorContent = getChildByType<SeparatorContentProps>(children, SeparatorContent);

  const separatorDivider = getChildByType<SeparatorDividerProps>(children, SeparatorDivider);

  const separatorContentPosition = extractPropFromComponent(separatorContent, 'position', 'center');

  const showLeftBox = separatorContentPosition === 'center' || separatorContentPosition === 'right';

  const showRightBox = separatorContentPosition === 'left' || separatorContentPosition === 'center';

  if (separatorContent) {
    return (
      <Box className={cn('flex-row items-center gap-1', className)} {...rest}>
        {showLeftBox && cloneElement(separatorDivider as ReactElement, { key: 'left-divider' })}
        {separatorContent}
        {showRightBox && cloneElement(separatorDivider as ReactElement, { key: 'right-divider' })}
      </Box>
    );
  }

  return <Box className={cn('flex-row items-center', className)}>{separatorDivider}</Box>;
}

Separator.displayName = 'Separator';
