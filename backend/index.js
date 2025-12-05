import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from './src/routes/auth.route.js'
import analyzeRoutes from './src/routes/analyze.route.js'
import reportsRoutes from './src/routes/reports.route.js'

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to database
connectDB();

console.log('🔧 CORS Configuration:');
console.log('CLIENT_URL:', process.env.CLIENT_URL);

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/analyze', analyzeRoutes);
app.use('/api/reports', reportsRoutes);
// health check 
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Accessibility Analyzer API',
    version: '1.0.0',
    status: 'running'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

//  start server
const PORT = process.env.PORT || 5000;
// Start server
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 API: http://localhost:${PORT}`);
  console.log('='.repeat(50) + '\n');
});
