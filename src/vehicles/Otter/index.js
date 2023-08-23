import { Gpio } from 'pigpio';
import VehicleBase from '../../core/VehicleBase.js';
import Driver from '../Otter/OtterDriver.js';

export default class Otter extends VehicleBase {
    constructor (app) {
        super(app);

        this.pins = {
            REGULAR_LIGHTS: new Gpio(23, { mode: Gpio.OUTPUT })
        };

        this.driver = new Driver(this);
    }

    toggleRegularLights() {
        try {
            return this.lights.toggleRegular(this.pins.REGULAR_LIGHTS);
        } catch (err) {
            throw err;
        }
    }
}
