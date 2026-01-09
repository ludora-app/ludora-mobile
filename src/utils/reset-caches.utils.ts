import { QueryClient } from '@tanstack/react-query';

import { mmkvStorage } from './mmkvStorage';

const queryClient = new QueryClient();

export const resetCaches = () => {
  // reset mmkv
  mmkvStorage.reset();

  // reset react query caches
  queryClient.clear();

  // reset zustandStores
};
