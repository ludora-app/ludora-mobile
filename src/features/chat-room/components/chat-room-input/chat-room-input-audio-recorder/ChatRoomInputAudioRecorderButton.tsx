import { cn } from '@chillui/ui';
import { Icon, String } from '@ludo/ui';
import { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSpring } from 'react-native-reanimated';
import {
  GestureEvent,
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler';

import useAudioRecorder from '../../../hooks/useAudioRecorder';
import { useChatRoomInputAudioStore } from '../../../store/chatRoomInputAudioStore';
// --- Constantes
const INITIAL_SIZE = 50;
const EXPAND_SIZE = 80;
const LOCK_THRESHOLD_Y = -80;
const DELETE_THRESHOLD_X = -100;
const LOCK_WRAPPER_INITIAL_HEIGHT = 130;
const LOCK_WRAPPER_COLLAPSED_HEIGHT = 50;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ChatRoomInputAudioRecorderButton() {
  const { isRecording, isRecordingLocked, setRecordingLocked, setShowTrashIconOnInput, showTrashIconOnInput } =
    useChatRoomInputAudioStore();
  const { audioUri, pingToStopRecording, setAudioUri, setPingToStopRecording, startRecording, stopRecording } =
    useAudioRecorder();
  // const { addOptimisticMessageToQueue } = useChatRoomMessageOptimisticQueue();
  const [lockAxis, setLockAxis] = useState<'x' | 'y' | 'center'>('x');
  const [isAborded, setIsAborded] = useState(false);
  const recordBtnSize = useSharedValue(INITIAL_SIZE);
  const recordBtnTranslateX = useSharedValue(0);
  const recordBtnTranslateY = useSharedValue(0);
  const lockWrapperOpacity = useSharedValue(0);
  const lockWrapperScale = useSharedValue(0);
  const lockWrapperTranslateX = useSharedValue(0);
  const lockWrapperTranslateY = useSharedValue(0);
  const lockWrapperHeight = useSharedValue(LOCK_WRAPPER_INITIAL_HEIGHT);

  const recordBtnStyle = useAnimatedStyle(() => ({
    height: recordBtnSize.value,
    transform: [{ translateX: recordBtnTranslateX.value }, { translateY: recordBtnTranslateY.value }] as const,
    width: recordBtnSize.value,
  }));

  const lockWrapperStyle = useAnimatedStyle(() => ({
    height: lockWrapperHeight.value,
    opacity: lockWrapperOpacity.value,
    transform: [
      { scale: lockWrapperScale.value },
      { translateY: lockWrapperTranslateY.value },
      { translateX: lockWrapperTranslateX.value },
    ] as const,
  }));

  const startRecord = () => {
    startRecording();
    recordBtnSize.value = withTiming(EXPAND_SIZE, { duration: 100 });
    lockWrapperOpacity.value = withTiming(1, { duration: 200 });
    lockWrapperScale.value = withTiming(1, { duration: 200 });
    isAborded && setIsAborded(false);
  };

  const reinitRecordButton = () => {
    recordBtnSize.value = withTiming(INITIAL_SIZE, { duration: 100 });
    recordBtnTranslateX.value = withSpring(0);
    recordBtnTranslateY.value = withSpring(0);
  };

  const reinitLockWrapper = () => {
    lockWrapperOpacity.value = withTiming(0, { duration: 200 });
    lockWrapperScale.value = withTiming(0, { duration: 200 });
    lockWrapperTranslateX.value = withSpring(0);
    lockWrapperTranslateY.value = withSpring(0);
    lockWrapperHeight.value = withSpring(LOCK_WRAPPER_INITIAL_HEIGHT);
  };

  const stopRecord = (cancel = false) => {
    if (cancel) {
      setRecordingLocked(false);
    }
    stopRecording();
    reinitRecordButton();
    reinitLockWrapper();
  };

  const handleGestureEvent = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    if (!isRecording) return;
    const { translationX, translationY } = event.nativeEvent;

    const x = translationX < 0 ? translationX : 0;
    const y = translationY < 0 ? translationY : 0;

    if (lockAxis) {
      if (x === 0 && y === 0) setLockAxis('center');
      else if (Math.abs(y) >= 1 && x === 0) setLockAxis('y');
      else if (Math.abs(x) >= 1 && y === 0) setLockAxis('x');
    }

    // Mouvement vertical : verrouillage "y"
    if (lockAxis === 'y') {
      // Si on dépasse la limite de lock
      if (translationY <= LOCK_THRESHOLD_Y) {
        !isRecordingLocked && setRecordingLocked(true);
        lockWrapperTranslateY.value = withSpring(0, {
          damping: 10,
          stiffness: 100,
        });
        reinitRecordButton();
      }

      // Tant qu’on n’a pas atteint la limite...
      if (translationY < 0 && translationY > LOCK_THRESHOLD_Y && !isRecordingLocked) {
        recordBtnTranslateY.value = translationY;
        lockWrapperTranslateY.value = translationY;

        // Réduit progressivement la hauteur
        lockWrapperHeight.value = withTiming(LOCK_WRAPPER_INITIAL_HEIGHT + translationY, { duration: 50 });
      } else if (translationY <= LOCK_THRESHOLD_Y && !isRecordingLocked) {
        // Si on atteint ou dépasse le seuil
        recordBtnTranslateY.value = LOCK_THRESHOLD_Y;
        lockWrapperTranslateY.value = LOCK_THRESHOLD_Y;

        // On passe la hauteur en « verrouillé »
        lockWrapperHeight.value = withTiming(LOCK_WRAPPER_COLLAPSED_HEIGHT, {
          duration: 50,
        });
      }
    }

    // Mouvement horizontal : verrouillage "x"
    if (lockAxis === 'x') {
      // if we pass the delete threshold => we stop recording
      if (translationX <= DELETE_THRESHOLD_X && isRecording) {
        isRecording && stopRecord(true);
        showTrashIconOnInput && setShowTrashIconOnInput(false);
        setIsAborded(true);
      }
      // animation to the left and hide the lock wrapper
      if (translationX < 0 && translationX > DELETE_THRESHOLD_X && !isRecordingLocked) {
        !showTrashIconOnInput && setShowTrashIconOnInput(true);
        recordBtnTranslateX.value = translationX;
        lockWrapperOpacity.value = withTiming(0, { duration: 200 });
      }
      // animation to the right and when attend 0 show again the lock wrapper
      else if (translationX > 0) {
        lockWrapperOpacity.value = withTiming(1, { duration: 200 });
        showTrashIconOnInput && setShowTrashIconOnInput(false);
      }
    }
  };

  const handleStateChange = (event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
    const { state } = event.nativeEvent;

    if (state === State.BEGAN && !isRecordingLocked) {
      startRecord();
    } else if (state === State.FAILED && !isRecordingLocked && isRecording) {
      setLockAxis('center');
      stopRecord();
    } else if (state === State.END && !isRecordingLocked && isRecording) {
      setLockAxis('center');
      stopRecord();
    }
  };

  const handleSubmit = () => {
    if (!audioUri) return;
    // addOptimisticMessageToQueue(audioUri, MessageType.AUDIO);
    setAudioUri(null);
  };

  useEffect(() => {
    if (audioUri && !isAborded) {
      handleSubmit();
    }
  }, [audioUri]);

  useEffect(() => {
    if (pingToStopRecording) {
      stopRecord(true);
      setPingToStopRecording(false);
    }
  }, [pingToStopRecording]);

  return (
    <PanGestureHandler onGestureEvent={handleGestureEvent} onHandlerStateChange={handleStateChange}>
      <View className="relative h-14 items-center justify-center">
        {isRecordingLocked ? (
          <View className="flex flex-row items-center gap-2">
            <Pressable
              className="items-center justify-center rounded-full border border-white"
              style={{ height: 50, width: 50 }}
              onPress={() => {
                stopRecord(true);
                setIsAborded(true);
              }}
            >
              <Icon variant="trash-solid" color="#ff0000" />
            </Pressable>
          </View>
        ) : (
          <Animated.View
            className="bg-primary absolute items-center justify-center rounded-full"
            style={recordBtnStyle}
          >
            <Icon variant="microphone-solid" color="#fff" />

            {!isRecordingLocked && isRecording && (lockAxis === 'x' || lockAxis === 'center') && (
              <View className="absolute right-full flex w-44 flex-row items-center">
                <View className="flex flex-row items-center">
                  <Icon variant="angle-left-solid" size="xs" className="-mr-2" />
                  <Icon variant="angle-left-solid" size="xs" />
                </View>
                <String size="2xs">Faire glisser pour supprimer</String>
              </View>
            )}
          </Animated.View>
        )}

        <AnimatedPressable
          className={cn('bg-darkLight absolute bottom-[110%] -z-10 items-center rounded-full p-2', {
            'size-40 items-center justify-center overflow-hidden': isRecordingLocked,
          })}
          style={[lockWrapperStyle, { width: 50 }]}
          onPress={() => {
            isRecordingLocked && stopRecord(true);
          }}
        >
          {!isRecordingLocked && (
            <View className="gap-2">
              <Icon variant="lock-solid" />
              <View className="flex flex-col items-center">
                <Icon variant="angles-up-solid" size="xs" />
              </View>
            </View>
          )}
          {isRecordingLocked && (
            <>
              <View className="absolute bottom-3 left-3">
                <Icon variant="lock-solid" size="xs" />
              </View>
              <View className="absolute h-[1px] w-16 rotate-45 bg-white" />
              <View className="absolute top-3 right-3">
                <Icon variant="paper-plane-solid" size="xs" />
              </View>
            </>
          )}
        </AnimatedPressable>
      </View>
    </PanGestureHandler>
  );
}
