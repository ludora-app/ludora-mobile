import { useDevicesUnregister } from '@generatedApi/devices/devices.api';

import { UnregisterDeviceDto } from '@/api/generated/model';

export const useUnRegisterDevice = () => {
  const mutate = useDevicesUnregister();

  const mutateAsync = (data: UnregisterDeviceDto) => mutate.mutateAsync({ data });

  return {
    ...mutate,
    mutateAsync,
  };
};
