import { FindMeUserResponseData } from '@api/generated/model';

import websocketService from './websocket.service';

// Fonctions utilitaires pour simplifier l'utilisation
export function connect(url: string, accessToken: string): void {
  websocketService.connect(url, accessToken);
}

export function disconnect(): void {
  websocketService.disconnect();
}

export function emit(event: string, data: any, callback?: (response: any, error: any) => void): boolean {
  return websocketService.emit(event, data, callback);
}

export function isConnected(): boolean {
  return websocketService.isConnected();
}

export function join(userId: FindMeUserResponseData['uid']): void {
  websocketService.emit('join', { room: `user_${userId}` });
}

export function leave(userId: FindMeUserResponseData['uid']): void {
  websocketService.emit('leave', { room: `user_${userId}` });
}

export function on(event: string, callback: (data: any) => void): void {
  websocketService.on(event, callback);
}

export function off(event: string, callback?: (data: any) => void): void {
  websocketService.off(event, callback);
}
