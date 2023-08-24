import { Gpio } from 'pigpio';
import VehicleBase from '../../core/VehicleBase.js';
import Driver from '../Otter/OtterDriver.js';
import DRIVER_L298N from '../../modules/motorDrivers/L298N.js';
import MotorEletGear from '../../core/motors/MotorEletGear.js';

export default class Otter extends VehicleBase {
    constructor (app) {
        super(app);

        this.pins = {
            REGULAR_LIGHTS: new Gpio(26, { mode: Gpio.OUTPUT })
        };

        this.driver = new Driver(this);
        this.motorDriver = new DRIVER_L298N({
            ENA: 12,
            IN1: 23,
            IN2: 24,
            IN3: 5,
            IN4: 6,
            ENB: 13
        }, new MotorEletGear(), new MotorEletGear());
    }

    toggleRegularLights() {
        try {
            return this.lights.toggleRegular(this.pins.REGULAR_LIGHTS);
        } catch (err) {
            throw err;
        }
    }

    aceleration(value) {
        try {
            this.motorDriver.aceleration(value);
        } catch (err) {
            throw err;
        }
    }
}
