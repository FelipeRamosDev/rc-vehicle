import { SerialPeer } from 'serial-peers';
import driver from '/home/felipe/Documents/repos/rc-vehicle/src/controllers/driver.js';

export default class DriverBase {
    constructor (vehicle) {
        this._vehicle = () => vehicle;

        this.serialPort = new SerialPeer({
            baudRate: 1000000,
            onOpen: this.serialOnOpen,
            onData: this.serialOnData,
            onError: this.serialOnError,
            endpoints: [ driver ]
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
