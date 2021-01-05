import http from 'http';
import { SimpleService } from './server';

/**
 * Client
 * a simple implementation for serving a client web page
 */
class ClientService extends SimpleService {
    service: http.Server;
    port: number;
    onRequestCallback: (request: http.IncomingMessage, response: http.ServerResponse) => void;

    constructor(name = 'Client', port = 3000, onRequest = (request: http.IncomingMessage, response: http.ServerResponse) => response.end('empty')) {
        super(name);
        this.port = port;
        this.onRequestCallback = onRequest;
        this.service = http.createServer(
            (req, res) => {
                this.onRequestCallback(req, res);
            }
        );
    }

    /**
     * start this web service
     * @todo implement promises
     */
    start() {
        this.service.listen(this.port);
        console.log('Client Started on ', this.port);
        return true;
    }

    /**
     * stop this web service
     * @todo implement error handling
     */
    stop() {
        this.service.close();
        return true;
    }
}

export default ClientService;