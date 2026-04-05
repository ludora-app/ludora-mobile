import ky from 'ky';

import { getApiUrl } from '@/utils/api-url.utils';

import { ForgottenPasswordDto, LoginResponseDto } from '../generated/model';

// Using custom method to pass resetToken in header

export const PATCH = async (newPassword: ForgottenPasswordDto['newPassword'], resetToken: string) => {
  const response = await ky
    .patch(`${getApiUrl()}/auth-b2c/password-reset`, {
      headers: {
        Authorization: `Bearer ${resetToken}`,
      },
      json: { newPassword },
    })
    .json<LoginResponseDto>();
  return response;
};
