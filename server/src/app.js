import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRouter from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Body parsing middleware ----> MOVE THESE UP HERE
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use('/api', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-production-domain.com']
    : ['http://localhost:3000'],
  credentials: true
}));

// Mount your routers/controllers
app.use('/api/auth', authRouter);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Peopulse API is running!',
    timestamp: new Date().toISOString()
  });
});

app.use('/api', (req, res) => {
  res.json({ message: 'Peopulse API - Routes will be implemented in Phase 1' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

app.use('/{*splat}', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Peopulse Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

export default app;
