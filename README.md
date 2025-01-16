# WebSocket Chat App

A simple chat application built with Node.js and Express, designed to facilitate real-time communication using WebSocket. The app provides a web interface for chatting and a REST API endpoint for sending messages programmatically.

## Features

- Real-time chat using WebSocket.
- Chat view accessible via the `/chat` endpoint.
- REST API endpoint `/api/send-message` for sending messages.
- Deployed on both Vercel and Render for production-ready hosting.

## How It Works

### WebSocket Functionality
Everyone connected to the WebSocket server can:
- Send messages.
- View messages sent by others in real-time.

### Web Interface
- Accessible at the `/chat` route.
- Users can input their name and message text to send messages.

### REST API Endpoint
- Endpoint: `/api/send-message`
- Method: `POST`
- JSON Body:

  ```json
  {
      "name": "Shafiul",
      "message": "Hi there!"
  }
  ```

## Deployment

The repository contains three branches:

- **main**: The primary branch for development.
- **vercel-deployment**: Configured for deployment to Vercel.
- **render-deployment**: Configured for deployment to Render.

### Deployed Servers

| Platform   | URL                                             | WebSocket Support |
|------------|-------------------------------------------------|-------------------|
| **Vercel** | [websocket-chat-plum.vercel.app](https://websocket-chat-plum.vercel.app) | ❌ (Not supported on free tier) |
| **Render** | [websocket-chat-b1ug.onrender.com](https://websocket-chat-b1ug.onrender.com) | ✅ |

### Notes
- Vercel does not support WebSocket connections on the free tier, so real-time chat is unavailable on the Vercel deployment.
- Render supports WebSocket connections on the free tier, enabling full functionality of the chat application.

## Purpose

This project was developed to learn:
- Building WebSocket-based applications using Node.js and Express.
- Deploying Node.js apps to cloud platforms such as Vercel and Render.

## Getting Started

### Prerequisites
- Node.js installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/imsajib02/websocket-chat.git
   ```
2. Navigate to the project directory:
   ```bash
   cd websocket-chat
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App Locally
1. Start the server:
   ```bash
   node server.js
   ```
2. Access the chat view at:
   [http://localhost:3000/chat](http://localhost:3000/chat)

3. Use the `/api/send-message` endpoint with tools like Postman or `curl` to send messages via REST API.

## License

This project is licensed under the Apache-2.0 License. See the `LICENSE` file for more details.

## Acknowledgements

- Special thanks to Vercel and Render for providing free-tier hosting services for this project.