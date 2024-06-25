#include <Lora32WifiBleV2.h>
#include <JoystickXY.h>

JoystickXY accelerator(36, 37);
JoystickXY steeringWheels(38, 39, 25);
Lora32WifiBleV2 lora32;

void setup() {
  lora32.init();
  accelerator.init();
  steeringWheels.init();
}

void loop() {
  JoystickXYResponse acceleration = accelerator.read();
  JoystickXYResponse steering = steeringWheels.read();

  int rawAcceleration = acceleration.y;
  int rawSteering = steering.x;
  int lightSwitcher = steering.buttonState;

  lora32.displayStartString("Analog Joystick:");
  lora32.displayBreakLine("Acceleration: " + String(rawAcceleration));
  lora32.displayBreakLine("Steering: " + String(rawSteering));
  lora32.displayBreakLine("Button: " + String(lightSwitcher == LOW ? "Pressed" : "Released"));
  lora32.displayEndString();

  // Building the querystring
  String dataToSend = "/driver?x=" + String(rawSteering) + "&y=" + String(rawAcceleration);

  lora32.sendStringPacket(dataToSend);
  // Wait for a second before sending another packet
  delay(1);
}
