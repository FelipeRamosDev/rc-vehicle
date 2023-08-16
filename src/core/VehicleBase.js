import Driver from './DriverBase';
import Motor from './motors/MotorBase';
import Lights from './lights/LightsBase';

export default class VehicleBase {
    constructor (app) {
        this.powerState = false;
        
        this._app = () => app;

        this.driver = new Driver(this);
        this.motor = new Motor();
        this.lights = new Lights();
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
