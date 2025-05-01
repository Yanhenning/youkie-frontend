# Youkie Frontend

A modern web application featuring a chat interface powered by LangChain for intelligent conversations.

## Features

- **User Authentication**: Register and login functionality with JWT token management
- **Interactive Chat**: Real-time conversation with AI powered by LangChain
- **WebSocket Integration**: Live streaming responses from the backend
- **Material UI Components**: Clean, responsive UI design

## Chat with LangChain Integration

The application features a chat interface that connects to a LangChain backend through WebSockets:

- Real-time message streaming for fluid conversation experience
- Intelligent responses powered by LangChain's language models
- Loading indicators for better user experience while waiting for responses
- Automatic scrolling for new messages

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Backend API server running (see configuration)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/youkie-frontend.git
   cd youkie-frontend
   ```

2. If you use nvm, switch to the correct Node.js version:
   ```
   nvm use
   ```
   This will use the Node.js version specified in the `.nvmrc` file.

3. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

4. Create an `.env.local` file with the following configuration:
   ```
   NEXT_PUBLIC_API_URL=http://your-backend-api-url
   NEXT_PUBLIC_WS_URL=ws://your-websocket-url
   ```
   For local development, these might look like:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
   ```

5. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Connection

The application connects to the backend API for:
- User authentication (register/login)
- WebSocket connection for the chat feature
- The backend will run in the localhost
- Make sure to set the `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_WS_URL` in your `.env.local` file to point to the correct backend URLs.

Make sure the backend server is running and properly configured in your environment variables.

## Technology Stack

- Next.js
- React
- TypeScript
- Material UI
- React Query
- Axios
- WebSocket API
