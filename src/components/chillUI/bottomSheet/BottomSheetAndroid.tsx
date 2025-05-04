import { useRouter } from 'expo-router';
import React, { useImperativeHandle, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheetNative, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';

import cn from '../cn/cn';
import { Box } from '../box';
import { BottomSheetProps } from '../utils/types';
import BottomSheetHeader from './BottomSheetHeader';
import BottomSheetFooter from './BottomSheetFooter';

export default function BottomSheetAndroid(props: BottomSheetProps) {
  const nativeRef = useRef<BottomSheetNative>(null);
  const {
    children,
    closeable,
    footer,
    footerClassName,
    screen,
    scrollView,
    sheetRef,
    showHeader = true,
    title,
    ...rest
  } = props;
  const { bottom, top } = useSafeAreaInsets();
  const router = useRouter();

  useImperativeHandle(sheetRef, () => ({
    close: () => nativeRef.current?.close(),
    collapse: () => nativeRef.current?.collapse(),
    expand: () => nativeRef.current?.expand(),
    forceClose: () => nativeRef.current?.forceClose(),
    snapToIndex: (index: number) => nativeRef.current?.snapToIndex(index),
    snapToPosition: (position: number) => nativeRef.current?.snapToPosition(position),
  }));

  return (
    <BottomSheetNative
      ref={nativeRef}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...(screen ? { onClose: () => router.back() } : {})}
      enableDynamicSizing={!scrollView}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...(screen || scrollView ? { index: 0 } : {})}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...(screen || scrollView ? { snapPoints: ['100%'] } : {})}
      enablePanDownToClose
      topInset={top + 20}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...rest}
    >
      <BottomSheetView className={cn('bg-white', { 'flex-1': !scrollView })}>
        {showHeader && (
          <BottomSheetHeader title={title} closeable={closeable} onClose={() => router.back()} screen={screen} />
        )}
        {!scrollView && (
          <Box style={{ paddingBottom: bottom }} className="flex-1">
            {children}
          </Box>
        )}
      </BottomSheetView>
      {scrollView && (
        <BottomSheetScrollView contentContainerStyle={{ paddingBottom: footer ? bottom + 70 : bottom }}>
          {children}
        </BottomSheetScrollView>
      )}
      {footer && <BottomSheetFooter footerClassName={footerClassName}>{footer}</BottomSheetFooter>}
    </BottomSheetNative>
  );
}
