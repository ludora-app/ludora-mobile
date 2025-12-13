import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useReducer } from 'react';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => Promise<void>];

function useAsyncState<T>(initialValue: [boolean, T | null] = [true, null]): UseStateHook<T> {
  const [state, dispatch] = useReducer(
    (prevState: [boolean, T | null], action: T | null = null): [boolean, T | null] => {
      if (prevState[1] === action) {
        return prevState;
      }
      return [false, action];
    },
    initialValue,
  );

  return [state, dispatch] as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (value == null) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

export function useSecureStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>();

  useEffect(() => {
    let isMounted = true;

    SecureStore.getItemAsync(key)
      .then(value => {
        if (isMounted) {
          setState(value);
        }
      })
      .catch(() => {
        if (isMounted) {
          setState(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [key, setState]);

  const setValue = useCallback(
    async (value: string | null) => {
      setState(value);
      try {
        await setStorageItemAsync(key, value);
      } catch (error) {
        console.error(`Failed to set storage item for key "${key}":`, error);
      }
    },
    [key, setState],
  );

  return [state, setValue];
}
