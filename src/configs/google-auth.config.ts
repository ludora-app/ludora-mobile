import { GoogleSignin } from '@react-native-google-signin/google-signin';

const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    forceCodeForRefreshToken: false,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    // offlineAccess: true, TODO: Activate this later
    profileImageSize: 120,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });
};

export default configureGoogleSignIn;
