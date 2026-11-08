import { LogBox } from 'react-native';

const ignoredPatterns: string[] = [];

let isWarnFilterInstalled = false;

/**
 * Silences the given warnings in development, matched on the start of the message.
 * Two mechanisms are needed: LogBox only handles the in-app overlay, while the line printed by
 * Metro comes straight from `console.warn`.
 */
export const ignoreLogs = (patterns: string[]) => {
  if (!__DEV__ || patterns.length === 0) {
    return;
  }

  ignoredPatterns.push(...patterns);
  LogBox.ignoreLogs(patterns);

  if (isWarnFilterInstalled) {
    return;
  }
  isWarnFilterInstalled = true;

  // eslint-disable-next-line no-console
  const forwardWarn = console.warn.bind(console);

  // eslint-disable-next-line no-console
  console.warn = (...args: unknown[]) => {
    const [message] = args;

    if (typeof message === 'string' && ignoredPatterns.some(pattern => message.includes(pattern))) {
      return;
    }

    forwardWarn(...args);
  };
};
