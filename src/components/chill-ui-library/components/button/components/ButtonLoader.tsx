import { useCSSVariable } from 'uniwind';

import type { ButtonLoaderProps } from '../../../types';

import { Box } from '../../box';
import { useButtonContext } from '../context/ButtonContext';
import { LoadingIndicator } from '../../loadingIndicatorsKit';
import { getButtonContentColorVariable } from '../styles/Button.styles';

/**
 * ButtonLoader component for showing loading state within a Button.
 * Renders a loading indicator with proper sizing from context.
 *
 * @example
 * ```tsx
 * <Button>
 *   <ButtonContainer>
 *     <ButtonLoader />
 *     <ButtonContent>
 *       <ButtonTitle>Loading...</ButtonTitle>
 *     </ButtonContent>
 *   </ButtonContainer>
 * </Button>
 * ```
 */
export default function ButtonLoader(props: ButtonLoaderProps) {
  const { colorVariant, sizingVariant, variant } = useButtonContext();
  const { name = 'spinner' } = props;
  // Same color as the title it replaces
  const contentColor = useCSSVariable(getButtonContentColorVariable({ colorVariant, variant }));

  return (
    <Box>
      <LoadingIndicator
        name={name}
        size={sizingVariant}
        color={typeof contentColor === 'string' ? contentColor : undefined}
        {...props}
      />
    </Box>
  );
}

ButtonLoader.displayName = 'ButtonLoader';
