/**
 * Interface IService
 * Services such as Websocket or webserver should be Implementing the IService
 */
export interface IService {
    name: string;
    start(): boolean;
    stop(): boolean;
}

export class SimpleService implements IService {
    name: string;

    constructor(name = 'Client') {
        this.name = name;
    }
    
    start() {
        console.log('Start Not implemented for ', this.name);
        return false;
    }

    stop() {
        console.log('Stop not implemented for ', this.name);
        return false;
    }
}

/**
 * Interface IServer
 * just a collection of services that should be grouped together
 */
export interface IServer {
    add(Service: IService): void;
    start(): boolean;
    stop(): boolean;
}

/**
 * SimpleServer
 * implementes a simple example server class
 * @todo implement promise based start/stop processes
 */
export class SimpleServer implements IServer {
    services: IService[];

    constructor() {
        this.services = [];
    }

    add(service: IService) {
        this.services.push(service);
    }

    start() {
        return this.services.every(service => service.start() == true);
    }
    
    stop() {
        return this.services.every(service => service.stop() == true);
    }
}

export default SimpleServer;