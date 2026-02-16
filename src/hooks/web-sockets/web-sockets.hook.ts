import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

import { getApiUrl } from '@/utils/api-url.utils';
import { useAuthStore } from '@/stores/auth.store';
import { useUserMe } from '@/queries/user-me.query';
import { useWebsocketStore } from '@/stores/websocket.store';
import { connect, disconnect, join, leave, on, emit, off } from '@/services/websocket/websocket.client';

import { useAppState } from '../app-state.hook';
import { useWebsocketOnNotifications } from './web-sockets-on-notifications/web-sockets-on-notifications.hook';

export const useWebsocketConnection = () => {
  const handleWSMessage = useWebsocketOnNotifications();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const { userMeId } = useUserMe(isAuthenticated);

  const { setAuthentication, setStatus, status } = useWebsocketStore();
  const { appState } = useAppState({ onlyIos: true });

  const handleActionAuthentication = ({ payload }: { payload: any }) => {
    if (userMeId) {
      setAuthentication(payload.isAuthenticated);
      join(userMeId);
    }
  };

  const connectWS = async () => {
    const accessToken = await SecureStore.getItemAsync('access_token');
    if (!accessToken) {
      console.log('No access token found, cannot connect to WebSocket.');
      return;
    }
    connect(getApiUrl(), accessToken);

    on('notification', message => {
      console.log('----MESSAGER: ', message);
      if (message.action === 'AUTHENTICATE' && message.payload.isAuthenticated) {
        handleActionAuthentication(message);
        emit('message', { text: "Salut serveur, tu m'entends ?" });
      }

      handleWSMessage(message);
    });
  };

  useEffect(() => {
    if (appState !== 'active') {
      console.log('----WS: inactive');
      setStatus('disconnected');
      return;
    }

    if (!userMeId) return;

    connectWS(); // 🔥 Appelle la version asynchrone correctement

    return () => {
      console.log('----WS: disconnect');
      setStatus('disconnected');
      disconnect();
      leave(userMeId);
      off('message');
    };
  }, [appState, userMeId]);
};
