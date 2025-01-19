#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Create LCD objects with unique I2C addresses
LiquidCrystal_I2C lcd1(0x27, 16, 2); // Change 0x27 to your first LCD's address
LiquidCrystal_I2C lcd2(0x26, 16, 2); // Change 0x26 to your second LCD's address
LiquidCrystal_I2C lcd3(0x25, 16, 2); // Change 0x25 to your third LCD's address

// Define RGB LED pins
const int rgb1[] = {3, 5, 6}; // RGB pins for LED 1
const int rgb2[] = {9, 10, 11}; // RGB pins for LED 2
const int rgb3[] = {13, 12, 8}; // RGB pins for LED 3

void setup() {
  // Initialize LCDs
  lcd1.init();
  lcd1.backlight();
  lcd2.init();
  lcd2.backlight();
  lcd3.init();
  lcd3.backlight();

  // Initialize RGB LEDs
  for (int i = 0; i < 3; i++) {
    pinMode(rgb1[i], OUTPUT);
    pinMode(rgb2[i], OUTPUT);
    pinMode(rgb3[i], OUTPUT);
  }

  Serial.begin(9600);
}

void loop() {
  if (Serial.available()) {
    String command = Serial.readStringUntil('\n');
    handleCommand(command);
  }
}

void handleCommand(String command) {
  // Parse the command (format: "LCD:n:Text" or "LED:n:RRGGBB")
  if (command.startsWith("LCD:")) {
    int lcdNum = command.charAt(4) - '0'; // Get LCD number
    String text = command.substring(6);  // Get text to display

    if (lcdNum == 1) {
      lcd1.clear();
      lcd1.print(text);
    } else if (lcdNum == 2) {
      lcd2.clear();
      lcd2.print(text);
    } else if (lcdNum == 3) {
      lcd3.clear();
      lcd3.print(text);
    }
  } else if (command.startsWith("LED:")) {
    int ledNum = command.charAt(4) - '0'; // Get LED number
    String hexColor = command.substring(6); // Get hex color

    int r = strtol(hexColor.substring(0, 2).c_str(), NULL, 16);
    int g = strtol(hexColor.substring(2, 4).c_str(), NULL, 16);
    int b = strtol(hexColor.substring(4, 6).c_str(), NULL, 16);

    if (ledNum == 1) {
      setColor(rgb1, r, g, b);
    } else if (ledNum == 2) {
      setColor(rgb2, r, g, b);
    } else if (ledNum == 3) {
      setColor(rgb3, r, g, b);
    }
  }
}

void setColor(const int led[], int r, int g, int b) {
  analogWrite(led[0], r);
  analogWrite(led[1], g);
  analogWrite(led[2], b);
}
