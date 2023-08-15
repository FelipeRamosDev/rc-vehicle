import API from './src/Services/API/index.js';
import SocketIO from './src/Services/SocketIO/index.js';

class App {
    constructor () {
        this.api = new API({
            onListen: () => console.log('API server is running!')
        });

        this.socketIO = new SocketIO();
    }
}

global.app = new App();
