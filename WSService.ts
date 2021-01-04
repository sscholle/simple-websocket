import WebSocket from 'ws';
import { IService } from './server';

class WSService implements IService {
  sockets: WebSocket[];
  server: WebSocket.Server;
  constructor() {
    this.sockets = [];
    this.server = new WebSocket.Server({
      port: 8080
    });
  }

  start() {
    this.server.on('connection', (socket) => {
      this.sockets.push(socket);

      socket.binaryType = 'arraybuffer';
      // When you receive a message, send that message to every socket.
      socket.on('message', (data) => {

        // BINARY
        if (data instanceof ArrayBuffer) {
          var buffer = data;
          console.log('Received arraybuffer');
        }

        // STRINGS
        if (typeof data === 'string') {
          //create a JSON object
          try {
            var jsonObject = JSON.parse(data);
            console.log('Received JSON string');
          } catch (e) {
            console.log('Received standard string');
          }
          console.log('Received data string');
        }

        this.sockets.forEach(s => s.send(data));
      });

      // When a socket closes, or disconnects, remove it from the array.
      socket.on('close', () => {
        this.sockets = this.sockets.filter(s => s !== socket);
      });
    });

    console.log('WSServer Started on ', 8080);
    return true;
  }
}

export default WSService;