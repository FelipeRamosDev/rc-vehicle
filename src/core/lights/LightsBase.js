export default class LightsBase {
    constructor () {
        this.regularState = false;
    }

    toggleRegular(pin) {
        if (!pin) {
            throw 'The "pin" param is required for the method LightsBase.toggleRegular!';
        }

        try {
            this.regularState = !this.regularState;
            pin.digitalWrite(this.regularState);

            return this.regularState;
        } catch (err) {
            throw err;
        }
    }
}
