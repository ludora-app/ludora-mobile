import type { ChipLoaderProps } from '../../../types';

import { Box } from '../../box';
import { twStyles } from '../styles/Chip.styles';
import { useChipContext } from '../context/ChipContext';
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
export default function ChipLoader(props: ChipLoaderProps) {
  const { sizingVariant } = useChipContext();
  const { name = 'spinner' } = props;

  return (
    <Box className={twStyles.loadingContainer}>
      <LoadingIndicator name={name} size={sizingVariant} {...props} />
    </Box>
  );
}

ChipLoader.displayName = 'ChipLoader';
