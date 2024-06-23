import { Gpio } from 'pigpio';

export default class DRIVER_L298N {
    constructor (setup, motorA, motorB) {
        const { ENA, IN1, IN2, IN3, IN4, ENB } = Object(setup);

        if (!motorA || !ENA || !IN1 || !IN2) {
            throw 'Motor A is required!'
        }

        this.currentDir = true;
        this.motorA = motorA;

        this.ENA = new Gpio(ENA, { mode: Gpio.OUTPUT });
        this.IN1 = new Gpio(IN1, { mode: Gpio.OUTPUT });
        this.IN2 = new Gpio(IN2, { mode: Gpio.OUTPUT });

        if (motorB && ENB && IN3 && IN4) {
            this.motorB = motorB;

            this.IN3 = new Gpio(IN3, { mode: Gpio.OUTPUT });
            this.IN4 = new Gpio(IN4, { mode: Gpio.OUTPUT });
            this.ENB = new Gpio(ENB, { mode: Gpio.OUTPUT });
        }

        this.init();
    }

    init() {
        this.setPWM();
        this.setDir(this.currentDir);
    }

    setDir(value) {
        this.IN1.digitalWrite(!value);
        this.IN2.digitalWrite(value);

        if (this.motorB) {
            this.IN3.digitalWrite(value);
            this.IN4.digitalWrite(!value);
        }

        this.currentDir = value;
    }

    setPWM() {
        this.ENA.pwmRange(this.motorA.pwmRange);
        this.ENA.pwmFrequency(this.motorA.pwmFrequency);

        if (this.motorB) {
            this.ENB.pwmRange(this.motorB.pwmRange);
            this.ENB.pwmFrequency(this.motorB.pwmFrequency);
        }
    }

    invertDirection() {
        this.setDir(!this.currentDir);
    }

    aceleration(values) {
        const { motorA, motorB } = Object(values);

        if (motorA <= this.motorA.pwmRange) {
            this.ENA.pwmWrite(this.motorA.toPWM(motorA));
        }

        if (this.motorB && motorB <= this.motorB.pwmRange) {
            this.ENB.pwmWrite(this.motorB.toPWM(motorB));
        }
    }
}
