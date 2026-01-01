const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/protected/dashboard
// @desc    Get protected dashboard data
// @access  Private
router.get('/dashboard', protect, (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the protected dashboard!',
    data: {
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
      message: 'This is a protected route. Only authenticated users can access this.',
    },
  });
});

module.exports = router;

