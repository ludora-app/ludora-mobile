import ky from 'ky';
import { Alert } from 'react-native';

const localServerDev = process.env.EXPO_PUBLIC_LOCAL_SERVER_DEV;

export const updateApiEnv = async (envLabel: string) => {
  try {
    await ky.post(`${localServerDev}/write-env`, {
      json: {
        content: `EXPO_PUBLIC_API_ENV=${envLabel}`,
      },
    });
  } catch {
    Alert.alert('Erreur', "Le serveur n'est pas lancé ?");
  }
};
