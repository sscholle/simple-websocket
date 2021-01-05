import Server from './server';
import WSService from './WSService';
import Client from './Client';

const serv = new Server();
serv.add(new WSService());
serv.add(new Client());
//serv.add(new SomeAPI());

serv.start();// starts all services in this server

// only stop by closing node process