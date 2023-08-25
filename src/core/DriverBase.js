import SocketIO from '../Services/SocketIO/index.js';

export default class DriverBase {
    constructor (vehicle) {
        this._vehicle = () => vehicle;

        this.socketIO = new SocketIO({
            allowedOrigins: ['http://192.168.15.45'],
            onConnected: (connection) => {
                this.initSocketListeners(connection);
            }
        });
    }

    get vehicle() {
        return this._vehicle();
    }
}
