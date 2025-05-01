import { cssInterop } from 'nativewind';
import { FlashList as FlashListNative, FlashListProps as FlashListNativeProps } from '@shopify/flash-list';

type FlashListProps<T> = FlashListNativeProps<T> & {
  contentContainerClassName?: string;
};

export default function FlashList(props: FlashListProps<any>) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <FlashListNative {...props} />;
}

cssInterop(FlashList, {
  contentContainerClassName: {
    target: 'contentContainerStyle',
  },
});
