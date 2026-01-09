import { AvatarProps } from '../../../types';

import getUserInitials from '../utils/getUsersInititials';

export const useAvatar = (data: AvatarProps['data']) => {
  const initials = data?.firstname ? getUserInitials(data) : '';
  const image = data?.image_url;

  return {
    image,
    initials,
  };
};
