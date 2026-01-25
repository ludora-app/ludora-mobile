import { useUserMe } from '@/queries';
import COLORS from '@constants/COLORS';
import { Message } from '@api/utils/api.types';
import { formatMsToMinutes } from '@utils/time';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Dimensions, Pressable } from 'react-native';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Icon, String, useToast, Slider } from '@components/nysaUi';

import useChatRoomPlaybackSoundStore from '../../../store/chatRoomPlaybackSoundStore';

type ChatRoomMessageContentAudioProps = {
  messageData: Message;
};
const width = Dimensions.get('window').width;

export default function ChatRoomMessageContentAudio({ messageData }: ChatRoomMessageContentAudioProps) {
  const { toast } = useToast();
  const { activeSound, activeSoundKey, setActiveSound } = useChatRoomPlaybackSoundStore();
  const { data: userMe } = useUserMe();
  const isMe = userMe?.id === messageData.user_id;

  const [currentDurationProgress, setCurrentDurationProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wasPlaying, setWasPlaying] = useState(false);

  const soundRef = useRef<Audio.Sound | null>(null);
  const { content } = messageData; // Audio URI

  /**
   * Main effect that handles:
   *  - The creation/loading of the sound
   *  - The subscription to playback updates
   *  - The cleanup (stop + unload) when unmounting
   */
  useEffect(() => {
    let isMounted = true;

    const prepareAudio = async () => {
      try {
        const { sound: playbackObject, status } = await Audio.Sound.createAsync(
          { uri: content as string },
          { shouldPlay: false },
        );

        // Assign the reference so other functions can access it
        soundRef.current = playbackObject;

        // If the status is loaded, update the duration
        if (status.isLoaded) {
          setDuration(status.durationMillis ?? 0);
        }

        // Define the callback function for each update
        playbackObject.setOnPlaybackStatusUpdate((playbackStatus: AVPlaybackStatus) => {
          if (!isMounted) return;

          if (playbackStatus.isLoaded) {
            setCurrentDurationProgress(playbackStatus.positionMillis ?? 0);
            setDuration(playbackStatus.durationMillis ?? 0);
            setIsPlaying(playbackStatus.isPlaying);

            // Gère la fin de l’audio
            if (playbackStatus.didJustFinish) {
              resetAudio();
            }
          }
        });
      } catch (error) {
        toast({
          message: "Erreur lors du chargement de l'audio",
          variant: 'error',
        });
      }
    };

    // Launch the audio preparation
    prepareAudio();

    // Clean up when the component unmounts
    return () => {
      isMounted = false;
      stopAndUnloadAudio();
    };
  }, [content, toast]);

  /**
   * Reset the audio (position, playback state)
   */
  const resetAudio = useCallback(async () => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(0);
      await soundRef.current.stopAsync();
    }
    setCurrentDurationProgress(0);
    setIsPlaying(false);
  }, []);

  /**
   * Generic function to stop + unload the audio
   */
  const stopAndUnloadAudio = useCallback(async () => {
    if (!soundRef.current) return;

    try {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
      setActiveSound(null);
    } catch (error) {
      toast({
        message: "Erreur lors de l'arrêt/déchargement de l'audio",
        variant: 'error',
      });
    }
  }, []);

  /**
   * Play the audio
   */
  const playAudio = useCallback(async () => {
    if (!soundRef.current) return;
    if (!!activeSound && soundRef.current._key !== activeSound._key) {
      await activeSound.pauseAsync();
    }

    try {
      // If the audio is at the end, set it to 0 before playing
      if (currentDurationProgress >= duration) {
        await soundRef.current.setPositionAsync(0);
      }
      await soundRef.current.playAsync();
      setIsPlaying(true);
      setActiveSound(soundRef.current);
    } catch (error) {
      toast({
        message: "Erreur lors de la lecture de l'audio",
        variant: 'error',
      });
    }
  }, [currentDurationProgress, duration, toast, activeSoundKey, activeSound]);

  /**
   * put the audio on pause
   */
  const pauseAudio = useCallback(async () => {
    if (!soundRef.current) return;

    try {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } catch (error) {
      toast({
        message: "Erreur lors de la mise en pause de l'audio",
        variant: 'error',
      });
    }
  }, [toast]);

  /**
   * Manage the main button: play/pause
   */
  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [isPlaying, playAudio, pauseAudio]);

  /**
   * Handle the "drag" of the slider
   */
  const handleSliderChange = useCallback(
    async (value: number[]) => {
      if (soundRef.current) {
        await soundRef.current.setPositionAsync(value[0]);
        setCurrentDurationProgress(value[0]);
        if (wasPlaying) {
          playAudio();
          setWasPlaying(false);
        }
      }
    },
    [playAudio, wasPlaying],
  );

  const handleSlidingStart = useCallback(() => {
    if (isPlaying) {
      setWasPlaying(true);
    }
    pauseAudio();
  }, [isPlaying, pauseAudio]);

  // Icon color depending on who sent the message
  const iconColor = isMe ? '#fff' : COLORS.primaryColor;

  return (
    <Box className="flex-row items-center gap-2">
      <Pressable onPress={togglePlayPause}>
        <Icon variant={isPlaying ? 'circle-pause-solid' : 'circle-play-solid'} color={iconColor} size="lg" />
      </Pressable>

      <Box className="flex-grow">
        <Slider
          value={currentDurationProgress}
          minimumValue={0}
          maximumValue={duration}
          onSlidingComplete={handleSliderChange}
          onSlidingStart={handleSlidingStart}
          thumbTintColor={iconColor}
          minimumTrackTintColor={iconColor}
          trackStyle={{
            width: width * 0.55,
          }}
        />

        <String
          size="xs"
          variant={isMe ? 'light' : 'dark'}
          weight="semiBold"
          className="absolute -bottom-[5px] right-0"
        >
          {currentDurationProgress > 0 ? formatMsToMinutes(currentDurationProgress) : formatMsToMinutes(duration)}
        </String>
      </Box>
    </Box>
  );
}
