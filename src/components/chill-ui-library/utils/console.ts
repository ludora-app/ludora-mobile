export const customConsole = {
  error: (message: string) => {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error(message);
    }
  },
  warn: (message: string) => {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.warn(message);
    }
  },
};
