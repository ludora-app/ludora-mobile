import { Box } from '@ludo/ui';
import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { WrapperGestureHandlerScrollViewProps } from '@/components/chill-ui-library';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';

import CreateSessionStep1Part1 from './create-session-step-1-part-1/create-session-step-1-part-1.component';
import CreateSessionStep1Part3 from './create-session-step-1-part-3/create-session-step-1-part-3.component';
import CreateSessionStep1Part2 from './create-session-step-1-part-2/create-session-step-1-part-2.component';

type CreateSessionStep1Props = {
  scrollViewRef: WrapperGestureHandlerScrollViewProps['ref'];
};

export default function CreateSessionStep1({ scrollViewRef }: CreateSessionStep1Props) {
  const hasScrolledToP3 = useRef(false);

  const { level, sport } = useCreateSessionStore(
    useShallow(state => ({
      level: !!state.session?.level,
      sport: !!state.session?.sport,
    })),
  );

  const showPart2 = !!sport;
  const showPart3 = !!level;

  useEffect(() => {
    if (!showPart3) {
      hasScrolledToP3.current = false;
    }
  }, [showPart3]);

  return (
    <>
      <CreateSessionStep1Part1 />
      {showPart2 && <CreateSessionStep1Part2 />}
      {showPart3 && (
        <Box
          onLayout={event => {
            const { y } = event.nativeEvent.layout;
            if (!hasScrolledToP3.current) {
              requestAnimationFrame(() => {
                scrollViewRef.current?.scrollTo({
                  animated: true,
                  y,
                });
              });
              hasScrolledToP3.current = true;
            }
          }}
        >
          <CreateSessionStep1Part3 />
        </Box>
      )}
    </>
  );
}
