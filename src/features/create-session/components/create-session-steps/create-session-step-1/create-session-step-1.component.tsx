import { useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Box, WrapperScrollView } from '@ludo/ui';
import { useShallow } from 'zustand/react/shallow';

import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';

import CreateSessionTitle from '../../create-session-title-component';
import CreateSessionStep1Part1 from './create-session-step-1-part-1/create-session-step-1-part-1.component';
import CreateSessionStep1Part3 from './create-session-step-1-part-3/create-session-step-1-part-3.component';
import CreateSessionStep1Part2 from './create-session-step-1-part-2/create-session-step-1-part-2.component';
import CreateSessionStep1Part4 from './create-session-step-1-part-4/create-session-step-1-part-4.component';

export default function CreateSessionStep1() {
  const scrollViewRef = useRef<ScrollView>(null);
  const { t } = useTranslate();
  const hasScrolledToP3 = useRef(false);
  const hasScrolledToP4 = useRef(false);

  const { gameMode, level, sport } = useCreateSessionStore(
    useShallow(state => ({
      gameMode: !!state.session?.gameMode,
      level: !!state.session?.level,
      sport: !!state.session?.additionalData?.sport,
    })),
  );

  const showPart2 = !!sport;
  const showPart3 = !!level;
  const showPart4 = !!gameMode;

  useEffect(() => {
    if (!showPart3) {
      hasScrolledToP3.current = false;
    }
    if (!showPart4) {
      hasScrolledToP4.current = false;
    }
  }, [showPart3, showPart4]);

  return (
    <WrapperScrollView ref={scrollViewRef} contentContainerClassName="gap-8 pb-10">
      <Box>
        <CreateSessionTitle title={t('create-session-steps.step_1.title')} />
        <CreateSessionStep1Part1 />
      </Box>
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
      {showPart4 && (
        <Box
          onLayout={event => {
            const { y } = event.nativeEvent.layout;
            if (!hasScrolledToP4.current) {
              requestAnimationFrame(() => {
                scrollViewRef.current?.scrollTo({
                  animated: true,
                  y,
                });
              });
              hasScrolledToP4.current = true;
            }
          }}
        >
          <CreateSessionStep1Part4 />
        </Box>
      )}
    </WrapperScrollView>
  );
}
