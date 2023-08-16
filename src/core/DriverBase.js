import SocketIO from '../Services/SocketIO/index.js';

export default class DriverBase {
    constructor (vehicle) {
        this._vehicle = () => vehicle;

        this.socketIO = new SocketIO();
    }

    get vehicle() {
        return this._vehicle();
    }
}
