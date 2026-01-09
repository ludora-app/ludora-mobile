import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import { StripeProvider as StripeProviderNative } from '@stripe/stripe-react-native';

interface StripeProviderProps {
  children: React.ReactElement;
}

const marchantId = Constants.expoConfig?.plugins?.find(plugin => plugin[0] === '@stripe/stripe-react-native')?.[1]
  .merchantIdentifier;

if (!marchantId) {
  throw new Error('No marchant id');
}

export default function StripeProvider({ children }: StripeProviderProps) {
  return (
    <StripeProviderNative
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      merchantIdentifier={marchantId}
      urlScheme={Linking.createURL('/')?.split(':')[0]}
    >
      {children}
    </StripeProviderNative>
  );
}
