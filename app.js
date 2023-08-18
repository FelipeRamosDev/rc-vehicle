import API from './src/Services/API/index.js';
import Otter from './src/vehicles/Otter.js';

class App {
    constructor () {
        this.api = new API(this, {
            onListen: () => console.log('API server is running!')
        });

        this.vehicle;
    }

    get initVehicle() {
        return {
            Otter: () => {
                try {
                    this.vehicle = new Otter(this);
                } catch (err) {
                    throw err;
                }
            }
        };
    }
}

global.app = new App();
