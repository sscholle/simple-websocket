import http from 'http';
import { SimpleService } from './server';

type ClientServiceRequestCallback = (request: http.IncomingMessage, response: http.ServerResponse) => void;

/**
 * Client
 * a simple implementation for serving a client web page
 */
class ClientService extends SimpleService {
    service: http.Server;
    port: number;
    onRequestCallback: ClientServiceRequestCallback;

    constructor(name = 'Client', port = 3000, onRequest = (request: http.IncomingMessage, response: http.ServerResponse) => response.end('empty')) {
        super(name);
        this.port = port;
        this.onRequestCallback = onRequest ? onRequest : (req, res) => res.end();
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
        console.log(this.name, this.port);
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