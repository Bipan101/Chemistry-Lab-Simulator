#include <Wire.h>

// Define RGB LED pins
const int rgb1[] = {2, 3, 4};    // RGB pins for LED 1
const int rgb2[] = {5, 6, 7};  // RGB pins for LED 2
const int rgb3[] = {8, 9, 10};  // RGB pins for LED 3

void setup() {
  // Initialize RGB LED pins as OUTPUT
  for (int i = 0; i < 3; i++) {
    pinMode(rgb1[i], OUTPUT);
    pinMode(rgb2[i], OUTPUT);
    pinMode(rgb3[i], OUTPUT);
  }

  // Start serial communication
  Serial.begin(9600);
}

void loop() {
  // Check if data is available on the Serial Monitor
  if (Serial.available()) {
    // Read the input command
    String command = Serial.readStringUntil('\n');
    // Handle the command
    handleCommand(command);
  }
}

void handleCommand(String command) {
  // Check if the command starts with "LED:"
  if (command.startsWith("LED:")) {
    int ledNum = command.charAt(4) - '0'; // Extract the LED number
    String hexColor = command.substring(6); // Extract the hex color code

    // Remove the '#' if present in the hex color
    if (hexColor.charAt(0) == '#') {
      hexColor = hexColor.substring(1);
    }

    // Convert the hex color to RGB values
    int r = strtol(hexColor.substring(0, 2).c_str(), NULL, 16);
    int g = strtol(hexColor.substring(2, 4).c_str(), NULL, 16);
    int b = strtol(hexColor.substring(4, 6).c_str(), NULL, 16);

    // Set the color for the specified LED
    if (ledNum == 1) {
      setColor(rgb1, r, g, b);
    } else if (ledNum == 2) {
      setColor(rgb2, r, g, b);
    } else if (ledNum == 3) {
      setColor(rgb3, r, g, b);
    } else {
      Serial.println("Invalid LED number.");
    }
  } else {
    Serial.println("Invalid command format.");
  }
}

void setColor(const int led[], int r, int g, int b) {
  // Set the RGB values using PWM
  analogWrite(led[0], r);
  analogWrite(led[1], g);
  analogWrite(led[2], b);
}