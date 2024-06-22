import API from './src/Services/API/index.js';
import Otter from './src/vehicles/Otter/index.js';

class App {
    constructor (startVehicle) {
        this.api = new API(this, {
            onListen: () => console.log('API server is running!')
        });

        this.vehicle;

        const vehicleToStart = this.initVehicle[startVehicle];
        if (vehicleToStart) {
            vehicleToStart();
        }
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

global.app = new App('Otter');
