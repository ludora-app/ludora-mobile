import { String } from '../string';
import { CardTextProps } from '../../types/card.types';

export const CardTitle = (props: CardTextProps) => <String variant="body-2" font="secondaryBold" {...props} />;
