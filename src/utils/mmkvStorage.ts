import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

type stateMmkvStorage = {
  getString: (name: string) => string | null;
  getNumber: (name: string) => number | null;
  getBoolean: (name: string) => boolean | null;
  removeItem: (name: string) => void;
  reset: () => void;
  setItem: (name: string, value: string | boolean) => void;
};

export const mmkvStorage: stateMmkvStorage = {
  getBoolean: name => storage.getBoolean(name) ?? null,
  getNumber: name => storage.getNumber(name) ?? null,
  getString: name => storage.getString(name) ?? null,
  removeItem: name => storage.remove(name),
  reset: () => storage.clearAll(),
  setItem: (name, value) => storage.set(name, value),
};
