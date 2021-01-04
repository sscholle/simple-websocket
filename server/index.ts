export interface IService {
    start(): boolean;
}

interface IServer {
    add(Service: IService): void;
    start(): boolean;
}

class Server implements IServer {
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
}

export default Server;