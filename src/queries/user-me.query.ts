import { useUsersFindMe } from '@generatedApi/users/users.api';

export const useUserMe = () => {
  const { data: userMe, ...rest } = useUsersFindMe();
  const userMeData = userMe?.data;
  const userMeId = userMeData?.uid;

  return { userMe: userMeData, userMeId, ...rest };
};
