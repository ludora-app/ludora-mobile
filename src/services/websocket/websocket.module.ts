import { User } from '@api/utils/api.types';

import websocketService from './websocket.service';

// Fonctions utilitaires pour simplifier l'utilisation
export function connect(url: string, accessToken: string): void {
  websocketService.connect(url, accessToken);
}

export function disconnect(): void {
  websocketService.disconnect();
}

export function emit(event: string, data: any): void {
  websocketService.emit(event, data);
}

export function join(userId: User['id']): void {
  websocketService.emit('join', { room: `user_${userId}` });
}

export function leave(userId: User['id']): void {
  websocketService.emit('leave', { room: `user_${userId}` });
}

export function on(event: string, callback: (data: any) => void): void {
  websocketService.on(event, callback);
}

export function off(event: string, callback?: (data: any) => void): void {
  websocketService.off(event, callback);
}
