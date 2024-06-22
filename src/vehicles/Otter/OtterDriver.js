import DriverBase from '../../core/DriverBase.js';

export default class OtterDriver extends DriverBase {
    constructor (vehicle) {
        super(vehicle);
    }

    get connection() {
        const connections = this.socketIO.connections
        const mainDriver = connections && this.socketIO.connections.mainDriver;

        return mainDriver && mainDriver.connection;
    }

    serialOnOpen() {
        console.log('Serial Connected!');
    }

    serialOnData(data) {
        console.log(data);
    }

    serialOnError(err) {
        throw err;
    }

    initSocketListeners(connection) {
        connection.on('lights:regular:toggle', () => {
            try {
                const currentState = this.vehicle.toggleRegularLights();
                this.connection.emit('lights:regular:toggle:response', { success: true, currentState });
            } catch (err) {
                this.connection.emit('lights:regular:toggle:response', { error: true, data: err });
            }
        });

        connection.on('aceleration:change', (value) => {
            try {
                if (isNaN(value)) {
                    throw new Error('Value should be a number, but received NaN!');
                }

                const newValue = Number(value);

                this.vehicle.aceleration(newValue);
                this.connection.emit('aceleration:change:response', { success: true, currentValue: newValue });
            } catch (err) {
                this.connection.emit('aceleration:change:response', { error: true, data: err });
            }
        });

        connection.on('steering-wheel:change', (value) => {
            if (isNaN(value)) {
                throw new Error('Value should be a number, but received NaN!');
            }

            const newValue = Number(value);

            this.vehicle.steeringPosition = newValue;
            this.vehicle.aceleration();
        });
    }

    parseSteeringWheel() {
        const aceleration = this.vehicle.currentAceleration;
        const turnPercent = this.vehicle.steeringPosition;
        const turnDecimal = turnPercent / 100;
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

        return result;
    }
}
