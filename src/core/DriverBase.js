import SocketIO from '../Services/SocketIO/index.js';

export default class DriverBase {
    constructor (vehicle) {
        this._vehicle = () => vehicle;

        this.socketIO = new SocketIO({ onConnected: (connection) => {
            this.initSocketListeners(connection);
        }});
    }

    get vehicle() {
        return this._vehicle();
    }
}
