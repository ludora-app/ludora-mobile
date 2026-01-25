import { Audio } from 'expo-av';
import { useToast } from '@components/nysaUi';
import { useCallback, useState } from 'react';
import { Alert, Vibration } from 'react-native';

import { useChatRoomInputAudioStore, useChatRoomInputAudioTimerStore } from '../store/chatRoomInputAudioStore';

const MAX_DURATION = 60;

export default function useAudioRecorder() {
  const { toast } = useToast();
  const { audioTimer, setAudioTimer } = useChatRoomInputAudioTimerStore();
  const { setIsRecording } = useChatRoomInputAudioStore();
  const [recording, setRecording] = useState<Audio.Recording | undefined>(undefined);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [pingToStopRecording, setPingToStopRecording] = useState(false);

  // get permission to record audio
  const audioRecorderPermission = async () => {
    const { granted } = await Audio.requestPermissionsAsync();
    if (!granted) {
      Alert.alert('Permission refusée', 'L’accès au microphone est requis pour enregistrer.');
      return;
    }
  };

  // Fonction pour démarrer l'enregistrement
  const startRecording = async () => {
    Vibration.vibrate(100);

    try {
      await audioRecorderPermission();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording: recordingObject, status } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets['HIGH_QUALITY'],
        status => {
          const duration = Math.round(status.durationMillis / 1000);
          if (status.isRecording) {
            setAudioTimer(duration);

            if (duration >= MAX_DURATION) {
              setPingToStopRecording(true);
            }
          }
        },
        1000,
      );
      setRecording(recordingObject);
      setIsRecording(status.isRecording);
      console.log(status.durationMillis);
    } catch (error) {
      console.log('error', error);
      stopRecording();
      toast({
        message: 'huu',
        position: 'top',
        variant: 'error',
      });
    }
  };

  // stop recording
  const stopRecording = useCallback(async () => {
    Vibration.vibrate(100);
    try {
      if (!recording) return;
      const uri = recording.getURI();
      if (audioTimer > 0) {
        setAudioUri(uri);
      }
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      setIsRecording(false);
      setAudioTimer(0);
    } catch {
      toast({
        message: 'ceci',
        position: 'top',
        variant: 'error',
      });
    }
  }, [recording, audioTimer]);

  return {
    audioUri,
    pingToStopRecording,
    setAudioUri,
    setPingToStopRecording,
    startRecording,
    stopRecording,
  };
}
