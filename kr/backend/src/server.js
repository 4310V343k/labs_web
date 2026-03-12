import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import factionsRoutes from './routes/factions.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.FRONTEND_URL || 'http://localhost:3000'

// CORS Middleware
app.use(cors({
  origin: ORIGIN,
  credentials: true,
}));

// JSON Middleware
app.use(express.json());

// URLEncoded Middleware
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/factions', factionsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use(errorHandler);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`CORS Origin: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});



function gracefulShutdown() {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);