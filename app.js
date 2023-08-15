import API from './src/Services/API/index.js';

class App {
    constructor () {
        this.api = new API({
            onListen: () => console.log('API server is running!')
        });
    }
}

global.app = new App();
