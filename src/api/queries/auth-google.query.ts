import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const signIn = async () => {
  await GoogleSignin.hasPlayServices();
  const response = await GoogleSignin.signIn();
  return response;
};

export const signOut = async () => {
  await GoogleSignin.signOut();
};
