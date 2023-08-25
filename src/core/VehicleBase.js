import Lights from './lights/LightsBase.js';

export default class VehicleBase {
    constructor (app) {
        this.powerState = false;
        
        this._app = () => app;

        this.steeringPosition = 0;
        this.currentAceleration = 0;
        this.lights = new Lights(this);
    }

    get app() {
        return this._app();
    }
}
