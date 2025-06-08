# HyperGamble

> **Note**: This project was originally developed as a commissioned work for a client who has graciously permitted its publication as part of my portfolio. The codebase has been sanitized and made public for educational and demonstration purposes.

HyperGamble is a full-stack web application that provides a modern and secure gambling platform integrated with the HyperLiquid protocol. The project consists of a Next.js frontend and a Node.js/Express backend, both written in TypeScript.

🎞️ [Demo showcase](https://youtu.be/AX_wLR3aTw0)
## 🌟 Features

- 🔐 Secure wallet integration with HyperLiquid protocol
- 💰 Real-time balance tracking and transactions
- 🎮 Multiple game modes
- 🤖 Telegram bot integration
- 📊 User dashboard with transaction history
- ⚡ Real-time updates using WebSocket
- 🎨 Modern UI with Tailwind CSS and Radix UI
- 🔒 Session-based authentication

## 🏗️ Tech Stack

### Frontend

- Next.js 15.0.3
- React 19.0 RC
- TypeScript 5.x
- Tailwind CSS 3.4
- Radix UI Components
- Framer Motion 11.x
- Axios 1.7.x
- React Hot Toast
- React Cookie
- React QR Code

### Backend

- Node.js 18+
- Express 4.21
- TypeScript 5.x
- PostgreSQL
- WebSocket (ws 8.18)
- Ethers.js 6.13
- Jest 29.x for testing
- Docker
- Node Telegram Bot API
- OpenAI Integration
- MessagePack for efficient data serialization

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- Docker and Docker Compose
- PostgreSQL (if running without Docker)
- Git

### Environment Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/hypergamble-public.git
cd hypergamble-public
```

2. Set up environment variables:

Backend (.env):

```env
DB_HOST=localhost
DB_DATABASE=mydb
DB_USER=postgres
DB_PASSWORD=your_password
DB_PORT=5432
BOT_TOKEN=your_telegram_bot_token
VAULT_PRIV_KEY=your_vault_private_key
VAULT_ADDRESS=your_vault_address
OPENAI_API_KEY=your_openai_api_key
```

Frontend (.env):

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/
```

### Running with Docker (Recommended)

1. Start the application:

```bash
cd backend
docker-compose up --build
```

This will start:

- Backend server on port 5000
- PostgreSQL database on port 5432
- Adminer (database management) on port 8080

2. In a new terminal, start the frontend:

```bash
cd frontend
npm install
npm run dev
```

### Running Locally

#### Backend Setup

```bash
cd backend
npm install
npm run dev
```

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 📝 API Documentation

### Main Endpoints

- `GET /validateSession` - Validate user session
- `POST /endGame` - End a game session
- WebSocket endpoints for real-time updates
- Telegram bot integration endpoints
- More endpoints documentation coming soon...

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

Tests are written using Jest and Supertest for API testing.

### Frontend Tests

```bash
cd frontend
npm run test
```

## 🛠️ Development

### Code Style

- The project uses TypeScript strict mode
- ESLint and Prettier are configured for code formatting
- Commit messages should follow conventional commits format
- Tailwind CSS for styling with custom animations and text shadow support

### Database Migrations

Database tables are automatically created when the backend starts. See `backend/src/db/createTables.ts` for schema details.

## 🔐 Security

- Environment variables for sensitive data
- Session-based authentication
- Rate limiting on API endpoints
- CORS protection
- Secure wallet handling
- MessagePack for secure and efficient data serialization

## 📦 Deployment

### Backend

The backend is containerized and can be deployed to any Docker-compatible hosting service. The Dockerfile and docker-compose.yml are provided in the backend directory.

### Frontend

The frontend is a Next.js application and can be deployed to Vercel or any other hosting service that supports Next.js.

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ✨ Acknowledgments

- HyperLiquid Protocol
- Next.js team
- Radix UI Components
- OpenAI for AI integration
- All contributors and supporters
