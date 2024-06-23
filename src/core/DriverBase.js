import { SerialPeer } from 'serial-peers';

export default class DriverBase {
    constructor (vehicle) {
        this._vehicle = () => vehicle;

        this.serialPort = new SerialPeer({
            baudRate: 1000000,
            onOpen: this.serialOnOpen,
            onData: this.serialOnData,
            onError: this.serialOnError
        });
    }
    
    serialOnOpen() {
        // Error preventing
    }

    serialOnData() {
        // Error preventing
    }

    serialOnError(err) {
        throw err;
    }

    get vehicle() {
        return this._vehicle();
    }
}
