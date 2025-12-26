import ky from 'ky';

import { RefreshTokenDto, RefreshTokenResponseDto } from '../generated/model';

const LOCAL_API_URL = `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:2424`;

export const POST = async (refreshToken: RefreshTokenDto['refreshToken']) => {
  const response = await ky
    .post(`${LOCAL_API_URL}/auth-b2c/refresh-token`, {
      json: { refreshToken },
    })
    .json<RefreshTokenResponseDto>();
  return response;
};
