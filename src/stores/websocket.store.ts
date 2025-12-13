import { create } from 'zustand';

import { User } from '../api/utils/api.types';

export type WsStatus = 'disconnected' | 'connected' | 'reconnecting';

type TConnectUser = Pick<User, 'id' | 'connectStatus'>;

interface IDefaultState {
  status: WsStatus;
  isAuthenticated: boolean;
  connectedUsers: Map<string, TConnectUser>;
}

interface IDefaultActions {
  setStatus: (value: WsStatus) => void;
  setAuthentication: (value: boolean) => void;
  removeConnectedUser: (connectedUserId: string) => void;
  addConnectedUser: (connectedUser: TConnectUser) => void;
  setConnectedUsers: (connectedUsers: TConnectUser[]) => void;
}

const defaultState: IDefaultState = {
  connectedUsers: new Map(),
  isAuthenticated: false,
  status: 'disconnected',
};

export const useWebsocketStore = create<IDefaultState & IDefaultActions>(set => ({
  ...defaultState,
  addConnectedUser: (connectedUser: TConnectUser) =>
    set(state => {
      const newConnectedUsers = new Map(state.connectedUsers);
      newConnectedUsers.set(connectedUser.id as string, connectedUser);
      return { connectedUsers: newConnectedUsers };
    }),
  removeConnectedUser: (connectedUserId: string) =>
    set(state => {
      const newConnectedUsers = new Map(state.connectedUsers);
      newConnectedUsers.delete(connectedUserId);
      return { connectedUsers: newConnectedUsers };
    }),
  setAuthentication: value => set({ isAuthenticated: value }),
  setConnectedUsers: users =>
    set({
      connectedUsers: new Map(users.map(user => [user.id as string, user])),
    }),
  setStatus: value => set({ status: value }),
}));
