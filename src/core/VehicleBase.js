import Driver from './DriverBase';
import Motor from './motors/MotorBase';
import Lights from './lights/LightsBase';

export default class VehicleBase {
    constructor () {
        this.powerState = false;
        
        this.driver = new Driver();
        this.motor = new Motor();
        this.lights = new Lights();
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
