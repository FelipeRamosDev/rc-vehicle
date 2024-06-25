import DriverBase from '../../core/DriverBase.js';
import driver from '/home/felipe/Documents/repos/rc-vehicle/src/controllers/driver.js';

export default class OtterDriver extends DriverBase {
    constructor (vehicle) {
        const driverEndpoint = driver;
        super(vehicle);

        driverEndpoint.setController(this.driverController.bind(this));
        this.serialPort.setEndpoint(driverEndpoint);
    }

    get connection() {
        const connections = this.socketIO.connections
        const mainDriver = connections && this.socketIO.connections.mainDriver;

        return mainDriver && mainDriver.connection;
    }

    driverController(data) {
        const parsed = this.parseXY(data);
        if (!parsed) {
            return;
        }

        const { steering, acceleration } = parsed;
        this.vehicle.steeringPosition = steering;

        if (this.vehicle.motorDriver.currentDir && acceleration < 0) {
            this.vehicle.invertDirection();
        } else if (!this.vehicle.motorDriver.currentDir && acceleration > 0) {
            this.vehicle.invertDirection();
        }

        this.vehicle.aceleration(Math.abs(acceleration));
    }

    parseXY(data) {
        const xResult = this.convertRawXY(data.x, 5) * -1;
        const yResult = this.convertRawXY(data.y, 6) * -1;

        if (!isNaN(xResult) && !isNaN(yResult)) {
            return {
                steering: xResult,
                acceleration: yResult
            };
        }
    }

    convertRawXY(value, threshold = 0) {
        const oldMin = 0;
        const oldMax = 4095;
        const newMin = -100;
        const newMax = 100;
        const result = ((value - oldMin) * (newMax - newMin) / (oldMax - oldMin)) + newMin;
        let parsed = parseInt(result) + threshold;

        if (parsed > 93) {
            parsed = 100;
        } else if (parsed < -93) {
            parsed = -100;
        }

        return parsed;
    }

    parseSteeringWheel() {
        const aceleration = this.vehicle.currentAceleration;
        const steering = this.vehicle.steeringPosition;
        const turnDecimal = steering / 100;
        const result = {};

        if (turnDecimal < 0) {
            const normalized = turnDecimal * (-1);
            const A = aceleration - (aceleration * normalized);

            result.motorA = parseInt(A);
            result.motorB = parseInt(aceleration);
        } else if (turnDecimal > 0) {
            const B = aceleration - (aceleration * turnDecimal);
            result.motorA = parseInt(aceleration);
            result.motorB = parseInt(B);
        } else {
            result.motorA = parseInt(aceleration);
            result.motorB = parseInt(aceleration);
        }

        console.log(result);
        return result;
    }
}
