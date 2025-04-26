import { AnimatedView } from './View';
import { AnimatedViewProps } from '../utils/types';

export default function AnimatedBox(props: AnimatedViewProps) {
  const { className, style, ...rest } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <AnimatedView style={style} className={className} {...rest} />;
}
