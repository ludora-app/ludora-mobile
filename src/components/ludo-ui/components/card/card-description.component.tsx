import { String } from '../string';
import { CardTextProps } from '../../types/card.types';

export const CardDescription = (props: CardTextProps) => (
  <String variant="body-sm" font="primarySemiBold" colorVariant="muted" {...props} />
);
