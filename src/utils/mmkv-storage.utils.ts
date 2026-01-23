import { createMMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

import { MMKVStorageKeyValue } from '@/constants/mmkv-keys.constants';

export const storage = createMMKV();

type stateMmkvStorage = {
  getString: (name: MMKVStorageKeyValue) => string | null;
  getNumber: (name: MMKVStorageKeyValue) => number | null;
  getBoolean: (name: MMKVStorageKeyValue) => boolean | null;
  removeItem: (name: MMKVStorageKeyValue) => void;
  reset: () => void;
  setItem: (name: MMKVStorageKeyValue, value: string | boolean) => void;
};

export const mmkvStorage: stateMmkvStorage = {
  getBoolean: name => storage.getBoolean(name) ?? null,
  getNumber: name => storage.getNumber(name) ?? null,
  getString: name => storage.getString(name) ?? null,
  removeItem: name => storage.remove(name),
  reset: () => storage.clearAll(),
  setItem: (name, value) => storage.set(name, value),
};


export const zustandStorage: StateStorage = {
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    storage.remove(name);
  },
  setItem: (name, value) => {
    storage.set(name, value);
  },
};
