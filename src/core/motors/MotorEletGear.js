export default class MotorEletGear {
    constructor (setup) {
        const { pwmRange, pwmFrequency } = Object(setup);

        this.pwmRange = pwmRange || 100;
        this.pwmFrequency = pwmFrequency || 100;

        this.currentDir = true;
    }

    toPWM(percentValue) {
        const decimal = percentValue / 100;
        return this.pwmRange * decimal;
    }
}
