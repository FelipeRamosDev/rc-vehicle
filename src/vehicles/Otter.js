import { Gpio } from 'pigpio';
import VehicleBase from '../core/VehicleBase.js';
import pins from '../../pins_config.js';

export default class Otter extends VehicleBase {
    constructor (app) {
        super(app);

        this.pins = {
            LIGHTS: new Gpio(pins.LIGHTS.gpio, { mode: Gpio.OUTPUT })
        };

        this.currentLight = false;
        const loop = setInterval(() => {
            this.currentLight = !this.currentLight;
            this.pins.LIGHTS.digitalWrite(this.currentLight);
        }, 1000);

        setTimeout(() => {
            clearInterval(loop);
        }, 60000);
    }
}
