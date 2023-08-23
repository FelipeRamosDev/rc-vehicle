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
    }
}
