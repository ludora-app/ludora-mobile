import { useStripe } from '@stripe/stripe-react-native';
import { BoxRowCenterBetween, Separator, String, WrapperGestureHandlerScrollView } from '@ludo/ui';

import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component';

import CreateSessionStep3PaymentFormSheetTrigger from './create-session-step-3-payment-trigger.component';

export default function CreateSessionStep3PaymentFormSheet() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  return (
    <>
      <FormSheetHeader title="Echauffe ta carte !" />
      <WrapperGestureHandlerScrollView>
        <String>Détails</String>
        <String>Réservation de terrain (1h)</String>
        <String>Frais de service</String>
        <Separator />
        <BoxRowCenterBetween>
          <String>Montant total</String>
          <String>10€</String>
        </BoxRowCenterBetween>
        <String>TVA non applicable, art. 293 B du CGI</String>
        <String>
          En passant cette réservation, vous acceptez les conditions générales de Ludora. Veuillez consulter notre site
          internet pour plus d’informations.
        </String>
        <CreateSessionStep3PaymentFormSheetTrigger />
      </WrapperGestureHandlerScrollView>
    </>
  );
}
