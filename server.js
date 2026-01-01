require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/database');
const { setupSecurity } = require('./middleware/security');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
setupSecurity(app);

// Body parser middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Cookie parser middleware
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'http://localhost:3000'
    : 'http://localhost:3000',
  credentials: true,
}));

// Serve static files from public directory
app.use(express.static('public'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// Root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

