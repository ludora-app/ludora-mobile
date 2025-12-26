import { useMutation } from '@tanstack/react-query';

import { QUERY_KEY } from '../utils/api.queryKey';
import { ForgottenPasswordDto } from '../generated/model';
import { PATCH as patchUserPassword } from '../queries/reset-user-password.query';

export function useResetUserPassword() {
  return useMutation({
    mutationFn: ({
      newPassword,
      resetToken,
    }: {
      newPassword: ForgottenPasswordDto['newPassword'];
      resetToken: string;
    }) => patchUserPassword(newPassword, resetToken),
    mutationKey: [QUERY_KEY.PASSWORD_RESET],
  });
}
