import { useDevicesRegisterDevice } from '@generatedApi/devices/devices.api';

import { RegisterDeviceDto } from '@/api/generated/model';

export const useRegisterDevice = () => {
  const mutate = useDevicesRegisterDevice();

  const mutateAsync = (data: RegisterDeviceDto) => mutate.mutateAsync({ data });

  return {
    ...mutate,
    mutateAsync,
  };
};
