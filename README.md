# Bipan101 Chemistry Lab Simulator

## Overview
The **Bipan101 Chemistry Lab Simulator** is a web-based platform designed to simulate chemistry lab experiments. It integrates Arduino components to enhance the simulation experience, making it interactive and educational.

---

## Directory Structure
```
└── bipan101-chemistry-lab-simulator/
    ├── README.md               # Documentation for the project
    ├── functions.js            # Core JavaScript functions for the simulator
    ├── package.json            # Dependencies and project metadata
    ├── server.js               # Main server file to start the application
    ├── arduino/                # Arduino-related code and configurations
    │   ├── lcd_control/        # LCD control Arduino code
    │   │   └── lcd_control.ino
    │   └── led_control/        # LED control Arduino code
    │       └── led_control.ino
    ├── routes/                 # Backend routes for handling application logic
    │   ├── _routes.js          # Centralized route management
    │   └── home.js             # Home route definitions
    └── views/                  # Frontend views rendered by the server
        ├── custom-page.ejs     # Custom EJS template for additional pages
        └── home.ejs            # Home page EJS template
```

---

## Features
- **Simulated Chemistry Lab:** A platform to virtually perform chemistry experiments.
- **Arduino Integration:** Uses Arduino components like LCD and LEDs to enhance interactivity.
- **Customizable Views:** Templates using EJS for flexible frontend development.
- **Backend API:** Node.js-based backend for robust application logic.

---

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/bipan101/chemistry-lab-simulator.git
   cd bipan101-chemistry-lab-simulator
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Server**
   ```bash
   node server.js
   ```
   Access the application at `http://localhost:3000` in your browser.

4. **Upload Arduino Code**
   - Navigate to the `arduino/` directory.
   - Use the Arduino IDE to upload the `.ino` files to your respective Arduino devices.

---

## Files and Folders

### Root Files
- **`README.md`**: This documentation file.
- **`functions.js`**: Contains core functions used across the project.
- **`package.json`**: Lists the dependencies and scripts for the project.
- **`server.js`**: The main server file to start and configure the application.

### Arduino
- **`lcd_control/`**: Contains code for controlling an LCD using Arduino.
- **`led_control/`**: Contains code for controlling LEDs using Arduino.

### Routes
- **`_routes.js`**: Centralized management for all routes.
- **`home.js`**: Logic for the home route.

### Views
- **`custom-page.ejs`**: Custom EJS template for additional pages.
- **`home.ejs`**: Main homepage EJS template.

---

## Dependencies
- **Node.js**: Backend runtime environment.
- **Express.js**: Framework for managing routes and middleware.
- **EJS**: Template engine for rendering dynamic HTML.

---

## Future Enhancements
- Add more interactive experiments.
- Enhance Arduino integration with additional sensors and actuators.
- Implement user authentication for personalized experiences.

---

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

---

## License
This project is licensed under the MIT License. See the `License` file for more details.

---

## Contact
For any inquiries, feel free to reach out to **Bipan101** via email or GitHub.

