# 💼 Peopulse - Know Your People. Drive Your Pulse.

A modern, full-stack HR Management System built with React 19, Express 5, and MySQL.

## 🚀 Features

- **Modern Tech Stack**: React 19 + Vite, Express 5, MySQL 8
- **Monorepo Structure**: Efficient development with pnpm workspaces  
- **Role-Based Access**: HR and Employee dashboards
- **Secure Authentication**: JWT with bcryptjs encryption
- **Responsive Design**: Mobile-first global CSS approach
- **Development Tools**: ESLint, Prettier, Hot reloading

## 📁 Project Structure

peopulse/
├── client/ # React frontend (port 3000)
├── server/ # Express backend (port 4000)
├── docker-compose.yml # MySQL database
└── pnpm-workspace.yaml # Workspace configuration


## 🛠️ Prerequisites

- Node.js 20+ LTS
- Docker Desktop
- pnpm (npm install -g pnpm)
- Git

## ⚡ Quick Start

1. **Clone and install:**
git clone <your-repo-url> peopulse
cd peopulse
pnpm install


2. **Setup environment:**
cp .env.example .env
cp client/.env.example client/.env
cp server/.env.example server/.env


3. **Start database:**
pnpm db:up


4. **Start development servers:**
pnpm dev


5. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Health Check: http://localhost:4000/health

## 📦 Available Scripts

- `pnpm dev` - Start both frontend and backend
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint on both projects
- `pnpm db:up` - Start MySQL database
- `pnpm db:down` - Stop MySQL database

## 🏗️ Development Phases

- ✅ **Phase 0**: Environment setup and project structure  
- 🔄 **Phase 1**: Backend API development (models, auth, routes)
- 🔄 **Phase 2**: Frontend authentication and landing page
- 🔄 **Phase 3**: HR and Employee dashboards  
- 🔄 **Phase 4**: Deployment and CI/CD

## 🤝 Contributing

1. Create feature branch
2. Follow ESLint/Prettier rules  
3. Test thoroughly
4. Submit pull request

## 📄 License

MIT License - see LICENSE file for details.
