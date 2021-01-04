import Server from './server';
import WSService from './WSService';
import Client from './Client';

const serv = new Server();
serv.add(new WSService());
serv.add(new Client());

serv.start();