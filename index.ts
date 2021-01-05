import Server from './server';
import WSService from './WSService';
import Client from './Client';
import { MessageEvent } from 'ws';
import fs from 'fs';

const serv = new Server();

const websocketMessageProcessor = (wsService: WSService, event: MessageEvent) => {
    const { data } = event;

    console.log(data);

    // Binary type = 'arrayBuffer'
    if (data instanceof ArrayBuffer) {
        console.log('Handling binary data as ArrayBuffer');
    }

    // Binary type = 'blob'
    if (data instanceof Buffer) {
        console.log('Handling binary data as "Buffer"');
    }

    // Plain Text string was sent
    if (typeof data === 'string') {
        // Try Parse JSON string
        try {
            var jsonObject = JSON.parse(data);
            console.log('Received JSON string');
        } catch (e) {
            console.log('Received standard string');
        }
    }

    // Releat the Message 100x times (just for fun)
    // for (let index = 0; index < 100; index++) {
        wsService.broadcast(data);
    // }
};
const RelayWSService = new WSService('RelayWebsocketService', 8080, 'arraybuffer', websocketMessageProcessor);
serv.add(RelayWSService);

const clientRequestHandler = (request, response) => {
    switch(request.method) {
        case 'GET':
            switch(request.url){
                case '/':
                    response.end(fs.readFileSync('./client/index.html'));
                    break;
                default:
                    response.end('Bad Request');
                    break;
                }
                break;
        default:
            response.end('Bad Request');
            break;
    }
};
const WebClient = new Client('WebClient', 3000, clientRequestHandler);
serv.add(WebClient);
//serv.add(new SomeAPI());

serv.start();// starts all services in this server

// only stop by closing node process