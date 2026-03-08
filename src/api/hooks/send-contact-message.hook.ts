import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@api/utils/api.queryKey';

import { sendContactMessage } from '@/api/queries/twenty-crm.query';

export function useSendContactMessage() {
  return useMutation({
    mutationFn: sendContactMessage,
    mutationKey: [QUERY_KEY.SEND_CONTACT_MESSAGE],
  });
}
