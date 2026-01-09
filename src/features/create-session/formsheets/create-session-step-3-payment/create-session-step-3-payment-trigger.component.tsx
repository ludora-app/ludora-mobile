import { useState } from 'react';
import { Button } from '@ludo/ui';
import { useToast } from '@chillui/ui';
import * as Linking from 'expo-linking';
import { useStripe } from '@stripe/stripe-react-native';

import COLORS from '@/constants/COLORS';
import StripeProvider from '@/providers/stripe.provider';

export default function CreateSessionStep3PaymentFormSheetTrigger() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const amount = 10;
  const connectedAccountId = 'connectedAccountId';
  const { toast } = useToast();

  const openPaymentSheet = async () => {
    try {
      const { error } = await presentPaymentSheet();
      if (error) {
        throw error;
      } else {
        toast({
          message: 'Paiement effectué avec succès',
          position: 'top',
          variant: 'success',
        });
        // await joinEvent();
        // navigation.navigate(ROUTES.partyScreenJoinConfirmation);
      }
    } catch (error: any) {
      console.log('openPaymentSheet', error);
      if (error.code !== 'Canceled') {
        toast({
          message: 'Une erreur est survenue lors du paiement',
          position: 'top',
          variant: 'error',
        });
      }
    }
  };

  const handlePayment = async () => {
    try {
      setIsLoading(true);

      // const { data } = await initializePaymentSheet({
      //   amount: amount * 100,
      //   connectedAccountId,
      // });
      const { customer, ephemeralKey, paymentIntent } = {
        customer: 'customer',
        ephemeralKey: 'ephemeralKey',
        paymentIntent: 'paymentIntent',
      };
      const { error } = await initPaymentSheet({
        appearance: {
          colors: {
            dark: {
              background: COLORS.background,
              componentBackground: COLORS.background,
              componentText: '#FFFFFF',
              icon: '#FFFFFF',
              placeholderText: '#FFFFFF',
              primary: COLORS.primary,
              primaryText: '#FFFFFF',
              secondaryText: '#FFFFFF',
            },
            light: {
              background: COLORS.background,
              componentBackground: COLORS.background,
              componentText: '#FFFFFF',
              icon: '#FFFFFF',
              placeholderText: '#FFFFFF',
              primary: COLORS.primary,
              primaryText: '#FFFFFF',
              secondaryText: '#FFFFFF',
            },
          },
          shapes: {
            borderRadius: 10,
          },
        },
        applePay: {
          merchantCountryCode: 'FR',
        },
        customerEphemeralKeySecret: ephemeralKey,
        customerId: customer,
        googlePay: {
          merchantCountryCode: 'FR',
          testEnv: true,
        },
        merchantDisplayName: 'Nysa',
        paymentIntentClientSecret: paymentIntent,
        returnURL: Linking.createURL('stripe-redirect'),
      });
      if (error) {
        throw error;
      } else {
        await openPaymentSheet();
      }
    } catch (error: any) {
      console.log('handlePayment', error);
      if (error.message === 'lol') {
        toast({
          message: 'Vous êtes déjà membre de cet événement',
          position: 'top',
          variant: 'error',
        });
      } else {
        toast({
          message: 'Une erreur est survenue lors du paiement',
          position: 'top',
          variant: 'error',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <StripeProvider>
      <Button title="test" onPress={handlePayment} />
    </StripeProvider>
  );
}
