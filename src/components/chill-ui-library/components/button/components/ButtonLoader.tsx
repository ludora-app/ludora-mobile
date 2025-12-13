import type { ButtonLoaderProps } from '../../../types';

import { Box } from '../../box';
import { twStyles } from '../styles/Button.styles';
import { useButtonContext } from '../context/ButtonContext';
import { LoadingIndicator } from '../../loadingIndicatorsKit';

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
  const { sizingVariant } = useButtonContext();
  const { name = 'spinner' } = props;

  return (
    <Box className={twStyles.loadingContainer}>
      <LoadingIndicator name={name} size={sizingVariant} {...props} />
    </Box>
  );
}

ButtonLoader.displayName = 'ButtonLoader';
