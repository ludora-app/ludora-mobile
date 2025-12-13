import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;

  connect(url: string, accessToken: string) {
    if (this.socket && this.socket.connected) {
      console.log('Already connected to Socket.IO server');
      return;
    }

    if (!accessToken) {
      console.log('No access token found in SecureStore not connected to WS');
      return;
    }

    // Fermer une ancienne connexion avant d'en ouvrir une nouvelle
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    this.socket = io(url, {
      auth: {
        token: accessToken,
      },
      reconnection: true,
      secure: true,
      transports: ['websocket'],
      withCredentials: true,
    });

    // Nettoyer avant d'attacher de nouveaux écouteurs
    this.socket.off('connect');
    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    this.socket.off('disconnect');
    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    this.socket.off('reconnect');
    this.socket.on('reconnect', () => {
      console.log('Reconnected to Socket.IO server');
    });

    this.socket.off('reconnect_error');
    this.socket.on('reconnect_error', error => {
      console.log('Reconnection error', error);
    });

    this.socket.off('error');
    this.socket.on('error', error => {
      console.log('Error', error);
    });
  }

  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    } else {
      console.warn(`Socket.IO not connected. Cannot emit event: ${event}`);
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.off(event); // Éviter les doublons
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback?: (data: any) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  disconnect() {
    if (this.socket) {
      console.log('Closing socket connection...');
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

const websocketService = new SocketService();

export default websocketService;
