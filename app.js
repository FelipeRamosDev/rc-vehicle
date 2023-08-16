import API from './src/Services/API/index.js';
import VehicleBase from './src/core/VehicleBase.js'

class App {
    constructor () {
        this.api = new API({
            onListen: () => console.log('API server is running!')
        });

        this.vehicle;
    }

    initVehicle() {
        try {
            this.vehicle = new VehicleBase(this);
        } catch (err) {
            debugger;
        }
    }
}

global.app = new App();
