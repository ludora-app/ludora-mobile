import ky from 'ky';

import { ForgottenPasswordDto, LoginResponseDto } from '../generated/model';

const LOCAL_API_URL = `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:2424`;

export const PATCH = async (newPassword: ForgottenPasswordDto['newPassword'], resetToken: string) => {
  const response = await ky
    .patch(`${LOCAL_API_URL}/auth-b2c/password-reset`, {
      headers: {
        Authorization: `Bearer ${resetToken}`,
      },
      json: { newPassword },
    })
    .json<LoginResponseDto>();
  return response;
};
