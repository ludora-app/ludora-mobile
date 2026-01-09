import { PaymentIntentDto } from '@api/generated/model';
import { usePaymentCreatePaymentIntent } from '@generatedApi/payment/payment.api';

export const useInitializePaymentSheet = () => {
  const mutation = usePaymentCreatePaymentIntent();

  const mutateAsync = (data: PaymentIntentDto) => mutation.mutateAsync({ data });

  const mutate = (data: PaymentIntentDto) => mutation.mutate({ data });

  return { isPending: mutation.isPending, mutate, mutateAsync };
};
