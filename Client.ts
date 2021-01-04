import http from 'http';
import fs from 'fs';

import { IService } from './server';

class Client implements IService {
    server: http.Server;

    constructor() {
        this.server = http.createServer(
            (req, res) => res.end(fs.readFileSync('./client/index.html').toString())
        );
    }

    start() {
        this.server.listen(3000);
        console.log('Client Started on ', 3000);
        return true;
    }
}

export default Client;