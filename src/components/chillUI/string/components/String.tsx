import cn from '../../cn/cn';
import { Text as NativeText } from './Text';
import { StringProps } from '../../utils/types';
import { textColorVr, textPositionVr, textSizeVr, textTypeVr } from '../utils/styleVariants';

export default function String(props: StringProps) {
  const { children, className, position, size, type, variant, weight } = props;

  const dynamicClasses = cn(
    'flex-shrink',
    textSizeVr({ size }),
    textTypeVr({ type, weight }),
    textColorVr({ variant }),
    textPositionVr({ position }),
    className,
  );

  return (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <NativeText {...props} className={dynamicClasses}>
      {children}
    </NativeText>
  );
}
