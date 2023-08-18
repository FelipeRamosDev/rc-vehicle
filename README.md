# RC Vehicle - Raspberry Pi 4
The base for a many types of rc vehicles: cars, trucks, etc.

## Pins Schema
| NAME             | PIN  | PIN     | NAME               | DESCRIPTION  |
| ---------------- | ---- | ----    | ------------------ | ------------ |
| 3V3              | 1    | 2       | 5V                 |              |
| GPIO 2 (SDA)     | 3    | 4       | 5V                 |              |
| GPIO 3 (SCL)     | 5    | 6       | GROUND             |              |
| GPIO 4 (GPCLK0)  | 7    | 6       | GPIO 14 (TXD)      |              |
| GROUND           | 9    | 8       | GPIO 15 (RXD)      |              |
| GPIO 17          | 11   | 12      | GPIO 18 (PCM_CLK)  |              |
| GPIO 27          | 13   | **14**  | GROUND             | Lighs Ground |
| GPIO 22          | 15   | **16**  | GPIO 23            | Lights OUT   |
| 3V3              | 17   | 18      | GPIO 24            |              |
| GPIO 10 (MOSI)   | 19   | 20      | GROUND             |              |
| GPIO 9 (MISO)    | 21   | 22      | GPIO 25            |              |
| GPIO 11 (SCLK)   | 23   | 24      | GPIO 8 (CE0)       |              |
| GROUND           | 25   | 26      | GPIO 7 (CE1)       |              |
| GPIO 0 (ID_SD)   | 27   | 28      | GPIO 1 (ID_SC)     |              |
| GPIO 5           | 29   | 30      | GROUND             |              |
| GPIO 6           | 31   | 32      | GPIO 12 (PWM0)     |              |
| GPIO 13 (PWM1)   | 33   | 34      | GROUND             |              |
| GPIO 19 (PCM_FS) | 35   | 36      | GPIO 16            |              |
| GPIO 26          | 37   | 38      | GPIO 20 (PCM_DIN)  |              |
| GROUND           | 39   | 40      | GPIO 21 (PCM_DOUT) |              |
