import ky from 'ky';
import { Alert } from 'react-native';

interface RunCommandResponse {
  stdout: string;
  stderr: string;
}

const localServerDev = process.env.EXPO_PUBLIC_LOCAL_SERVER_DEV;

export const runBunScript = async (command: string) => {
  try {
    await ky
      .post(`${localServerDev}/run-command`, {
        json: {
          command,
        },
      })
      .json<RunCommandResponse>();
  } catch {
    Alert.alert('Erreur', "Le serveur n'est pas lancé ?");
  }
};
