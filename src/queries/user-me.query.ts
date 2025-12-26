import { useUsersFindMe } from '@generatedApi/users/users.api';

export const useUserMe = (isEnabled: boolean = true) => {
  const { data: userMe, ...rest } = useUsersFindMe({
    query: {
      enabled: isEnabled,
    },
  });
  const userMeData = userMe?.data;
  const userMeId = userMeData?.uid;

  return { userMe: userMeData, userMeId, ...rest };
};
