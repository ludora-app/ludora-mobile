import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';

const useAppStateChange = (onActive: () => void, onInactive?: () => void) => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        onActive();
      } else if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
        onInactive && onInactive();
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [onActive, onInactive]);
};

export default useAppStateChange;

export const useAppState = ({ onlyIos }: { onlyIos: boolean }) => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const appStateToReturn = Platform.OS === 'ios' && onlyIos ? appState : 'active';

  return { appState: appStateToReturn };
};
