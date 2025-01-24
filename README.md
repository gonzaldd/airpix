# Airpix: Image Sharing App

Airpix is a cross-platform mobile application built with React Native that allows users to easily share images between devices on a local network.  It uses a TCP socket connection for direct image transfer, providing a fast and efficient way to share photos without relying on external services or the internet.

![](https://raw.githubusercontent.com/gonzaldd/airpix/refs/heads/main/doc/demo.gif)

## Features

* **Local Network Sharing:** Share images directly between devices connected to the same Wi-Fi network.
* **Fast Transfer:**  Utilizes TCP sockets for quick and efficient image transmission.
* **Simple Interface:**  Easy-to-use interface for selecting and sharing photos.
* **Image Preview:** View selected images in a modal before sharing.
* **Cross-Platform:** Works on both iOS and Android devices.


## How it Works

Airpix consists of two main roles:

1. **Server:**  The server device selects images from its library and makes them available for transfer. It displays its local IP address, which the client device needs to connect.
2. **Client:** The client device enters the server's IP address to establish a connection. Once connected, the server automatically sends the chosen images to the client. The client can then save the received images to their device's gallery.


## Installation

1. Clone the repository: `git clone https://github.com/gonzaldd/airpix.git`
2. Navigate to the project directory: `cd airpix`
3. Install dependencies: `yarn` or `npm install`


## Usage

1. **Server Device:**
    * Open the app and select "Compartir Imagenes" (Share Images).
    * Choose the images you want to share from your library.
    * Note down the displayed IP address.

2. **Client Device:**
    * Open the app and select "Importar Imagenes" (Import Images).
    * The app will attempt to connect to the server running on your local machine. Ensure the server is running before attempting to connect. The current implementation connects to 'localhost'. 
    * Once connected, the server-selected images will appear. Tap an image to save it to your gallery.

## Code Overview

The project uses React Native along with the following key libraries:

* **`react-native-tcp-socket`:**  Handles TCP socket communication.
* **`react-native-image-picker`:** Allows users to select images from their library.
* **`@react-native-camera-roll/camera-roll`:** Enables saving images to the device's gallery.
* **`@react-native-community/netinfo`:**  Retrieves network information, including the device's IP address.
* **`@gluestack-ui`:** For UI components.
* **`nativewind`:** For styling.


## Project Structure

* **`components/`**: Contains reusable UI components.
* **`src/hooks/`**:  Custom hooks for managing TCP socket connections (client and server).
* **`src/views/`**:  Contains the different screens of the app.

## Future Enhancements

* **Improved Connection Management:**  Implement more robust error handling and connection status indicators.
* **Progress Bar:** Display a progress bar to show the status of image transfers.
* **Direct IP Connection:** Allow users to specify the server IP address on the client side.


## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.