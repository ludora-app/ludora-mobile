import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

import { useAuthStore } from '@/stores/auth.store';
import { useUserMe } from '@/queries/user-me.query';
import { WS_RESOURCES } from '@/types/websocket.type';
import { useWebsocketStore } from '@/stores/websocket.store';
import { connect, disconnect, join, leave, on, emit, off } from '@/services/websocket/websocket.module';

import { useAppState } from './app-state.hook';

export const useWebsocketConnection = () => {
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

  const handleWSMessage = ({ payload, ressource }: { ressource: string; payload: any }) => {
    switch (ressource) {
      case WS_RESOURCES.MESSAGE:
        console.log('----WS: CHAT_ROOM_MESSAGE', payload);
        break;
      case WS_RESOURCES.STRIPE:
        console.log('----WS: STRIPE_CONNECT_URL', payload);
        break;
    }
  };

  const connectWS = async () => {
    const accessToken = await SecureStore.getItemAsync('access_token');
    if (!accessToken) {
      console.log('No access token found, cannot connect to WebSocket.');
      return;
    }
    connect(`${process.env.EXPO_PUBLIC_DEV_API_URL}`, accessToken);

    on('message', message => {
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
