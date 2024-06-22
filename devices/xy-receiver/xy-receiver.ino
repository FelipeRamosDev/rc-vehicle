#include <Lora32WifiBleV2.h>

Lora32WifiBleV2 lora32;

void setup() {
  Serial.begin(1000000, SERIAL_8N1, 3, 1);

  lora32.init();
}

void loop() {
  String received = lora32.readString();

  if (received != "") {
    lora32.displayStartString("Analog Joystick:");
    lora32.displayBreakLine(received);
    lora32.displayEndString();

    // Sending via serial RX TX
    Serial.println(received);
  }
  
  // Wait for a second before sending another packet
  delay(1);
}
