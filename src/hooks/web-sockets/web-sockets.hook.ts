import { useCallback, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

import { getApiUrl } from '@/utils/api-url.utils';
import { useAuthStore } from '@/stores/auth.store';
import { useUserMe } from '@/queries/user-me.query';
import { useWebsocketStore } from '@/stores/websocket.store';
import { connect, disconnect, join, leave, on, off } from '@/services/websocket/websocket.client';

import { useAppState } from '../app-state.hook';
import { useWebsocketOnNotifications } from './web-sockets-on-notifications/web-sockets-on-notifications.hook';

export const useWebsocketConnection = () => {
  const handleWSMessage = useWebsocketOnNotifications();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const { userMeId } = useUserMe(isAuthenticated);

  const { setAuthentication, setStatus, tokenVersion } = useWebsocketStore();
  const { appState } = useAppState({ onlyIos: true });

  const handleActionAuthentication = useCallback(
    ({ payload }: { payload: any }) => {
      if (userMeId) {
        setAuthentication(payload.isAuthenticated);
        join(userMeId);
      }
    },
    [userMeId, setAuthentication],
  );

  const connectWS = useCallback(async () => {
    const accessToken = await SecureStore.getItemAsync('access_token');
    if (!accessToken) return;

    connect(getApiUrl(), accessToken);

    on('notification', message => {
      if (message.action === 'AUTHENTICATE' && message.payload.isAuthenticated) {
        handleActionAuthentication(message);
      }
      handleWSMessage(message);
    });
  }, [handleActionAuthentication, handleWSMessage]);

  useEffect(() => {
    if (appState !== 'active') {
      setStatus('disconnected');
      return undefined;
    }

    if (!userMeId) return undefined;

    connectWS();

    return () => {
      setStatus('disconnected');
      disconnect();
      leave(userMeId);
      off('notification');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState, userMeId, tokenVersion]);
};
