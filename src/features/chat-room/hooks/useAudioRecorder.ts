import { useToast } from '@chillui/ui';
import { Alert, Vibration } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import {
  useAudioRecorder as useAudioRecorderNative,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorderState,
  requestRecordingPermissionsAsync,
} from 'expo-audio';

import { useChatRoomInputAudioStore, useChatRoomInputAudioTimerStore } from '../store/chatRoomInputAudioStore';

const MAX_DURATION = 60;

export default function useAudioRecorder() {
  const { toast } = useToast();
  const { audioTimer, setAudioTimer } = useChatRoomInputAudioTimerStore();
  const { setIsRecording } = useChatRoomInputAudioStore();
  const audioRecorder = useAudioRecorderNative(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [pingToStopRecording, setPingToStopRecording] = useState(false);

  // Request permissions on mount
  useEffect(() => {
    (async () => {
      const status = await requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert('Permission refusée', "L'accès au microphone est requis pour enregistrer.");
      }

      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });
    })();
  }, []);

  // Track recording duration and update timer
  useEffect(() => {
    if (recorderState.isRecording && recorderState.durationMillis !== undefined) {
      const duration = Math.round(recorderState.durationMillis / 1000);
      setAudioTimer(duration);

      if (duration >= MAX_DURATION) {
        setPingToStopRecording(true);
      }
    }
  }, [recorderState.isRecording, recorderState.durationMillis, setAudioTimer]);

  // Sync recording state with store
  useEffect(() => {
    setIsRecording(recorderState.isRecording);
  }, [recorderState.isRecording, setIsRecording]);

  // Start recording
  const startRecording = async () => {
    Vibration.vibrate(100);

    try {
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
    } catch (error) {
      console.log('error', error);
      toast({
        message: "Erreur lors du démarrage de l'enregistrement",
        position: 'top',
        variant: 'error',
      });
    }
  };

  // Stop recording
  const stopRecording = useCallback(async () => {
    Vibration.vibrate(100);
    try {
      if (!recorderState.isRecording) return;

      await audioRecorder.stop();

      // The recording will be available on audioRecorder.uri
      const { uri } = audioRecorder;
      if (audioTimer > 0 && uri) {
        setAudioUri(uri);
      }

      setAudioTimer(0);
      setPingToStopRecording(false);
    } catch (error) {
      console.log('error', error);
      toast({
        message: "Erreur lors de l'arrêt de l'enregistrement",
        position: 'top',
        variant: 'error',
      });
    }
  }, [audioRecorder, recorderState.isRecording, audioTimer, setAudioTimer]);

  return {
    audioUri,
    pingToStopRecording,
    setAudioUri,
    setPingToStopRecording,
    startRecording,
    stopRecording,
  };
}
