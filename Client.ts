import http from 'http';
import fs from 'fs';
import { SimpleService } from './server';

/**
 * Client
 * a simple implementation for serving a client web page
 */
class ClientService extends SimpleService {
    service: http.Server;
    port: number;

    constructor(name = 'Client', port = 3000) {
        super(name);
        this.port = port;
        this.service = http.createServer(
            (req, res) => res.end(fs.readFileSync('./client/index.html').toString())
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