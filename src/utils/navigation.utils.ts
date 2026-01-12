import { useEffect } from 'react';

/**
 * Hook pour réinitialiser un store Zustand quand l'utilisateur quitte l'écran.
 * @param resetFn La fonction de reset du store (souvent appelée reset ou clear)
 */
export const useResetStoreOnUnmount = (resetFn: () => void) => {
  useEffect(
    () => () => {
      resetFn();
    },
    [resetFn],
  );
};
