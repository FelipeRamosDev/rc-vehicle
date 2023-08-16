import Driver from './DriverBase.js';
import Motor from './motors/MotorBase.js';
import Lights from './lights/LightsBase.js';

export default class VehicleBase {
    constructor (app) {
        this.powerState = false;
        this.lightState = false;
        
        this._app = () => app;

        this.driver = new Driver(this);
        this.motor = new Motor(this);
        this.lights = new Lights(this);
    }

    get app() {
        return this._app();
    }

    async powerOnOff(state) {
        try {
            
        } catch (err) {
            debugger;
        }
    }

    async switchLights() {
        try {
            
        } catch (err) {
            debugger;
        }
    }

    async aceleration(value) {
        try {
            
        } catch (err) {
            debugger;
        }
    }
}
