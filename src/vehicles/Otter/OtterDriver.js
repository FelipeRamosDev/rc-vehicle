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
                const parsedValue = this.parseSteeringWheel(newValue, this.vehicle.steeringPosition);

                this.vehicle.aceleration(parsedValue);
                this.connection.emit('aceleration:change:response', { success: true, currentValue: parsedValue });
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
        });
    }

    parseSteeringWheel(aceleration, turnPercent) {
        const turnDecimal = turnPercent / 100;
        const result = {};
    
    
        if (turnPercent < 0) {
            const normalized = turnDecimal * (-1);
            result.motorA = aceleration - (aceleration * normalized);
            result.motorB = aceleration;
        } else if (turnPercent > 0) {
            result.motorA = aceleration;
            result.motorB = aceleration - (aceleration * turnDecimal);
        } else {
            result.motorA = aceleration;
            result.motorB = aceleration;
        }
    
        return result;
    }
}
