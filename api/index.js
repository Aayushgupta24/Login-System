// Vercel serverless function entry point
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('../config/database');
const { setupSecurity } = require('../middleware/security');
const authRoutes = require('../routes/auth');
const protectedRoutes = require('../routes/protected');

// Connect to database
connectDB();

const app = express();

// Security middleware
setupSecurity(app);

// Body parser middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Cookie parser middleware
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development, allow localhost
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // In production, allow:
    // 1. FRONTEND_URL if set
    // 2. VERCEL_URL (automatically set by Vercel)
    // 3. Any .vercel.app domain (for preview deployments)
    const allowed = [
      process.env.FRONTEND_URL,
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
    ].filter(Boolean);
    
    // Also allow any Vercel preview URL
    if (origin.includes('.vercel.app')) {
      return callback(null, true);
    }
    
    if (allowed.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// API Routes (must come before static files)
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// Serve static files from public directory (React build)
app.use(express.static(path.join(process.cwd(), 'public')));

// Serve React app for all non-API routes (SPA routing)
app.get('*', (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      message: 'Route not found',
    });
  }
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Export the app for Vercel serverless functions
module.exports = app;

