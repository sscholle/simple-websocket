import WebSocket, { MessageEvent } from 'ws';
import { SimpleService } from './server';

type WSServiceMessageCallback = (instance: WSService, event: MessageEvent) => void;

/**
 * WSService
 * a simple WebSocker server
 */
class WSService extends SimpleService {
  sockets: WebSocket[];
  server: WebSocket.Server;
  port: number;
  binaryType: string;
  onMessageCallback: WSServiceMessageCallback;

  constructor(name: string = 'WSService', port: number = 8080, binaryType: string = 'blob', onMessage: WSServiceMessageCallback) {
    super(name);
    this.port = port;
    this.binaryType = binaryType;// Note BinaryType of Receiver and Sender must be the same
    this.sockets = [];
    this.onMessageCallback = onMessage ? onMessage : () => null;
    this.server = new WebSocket.Server({
      port
    });
  }

  /**
   * start the wesocket service
   * implement callbacks for events
   */
  start() {
    this.server.on('connection', (socket) => {
      socket.binaryType = this.binaryType;
      this.sockets.push(socket);

      socket.onmessage = (event) => this.onMessageCallback(this, event);

      // When a socket closes, or disconnects, remove it from the array.
      socket.on('close', () => {
        this.sockets = this.sockets.filter(s => s !== socket);
      });
    });

    console.log(this.name, this.port);
    return true;
  }

  /**
   * Send Data to all currently conected WS Clients
   * @param data data to be sent
   */
  broadcast(data: WebSocket.Data) {
    this.sockets.forEach(s => s.send(data));
  }

  stop() {
    this.server.close();
    return true;
  }
}

export default WSService;