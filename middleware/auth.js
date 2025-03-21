const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Get token from authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Authentication required. No token provided.' });
    }
    
    // Check if the header format is correct (Bearer [token])
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Authentication format is incorrect. Use Bearer [token]' });
    }
    
    const token = parts[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user ID to request for use in route handlers
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Authentication error' });
  }
};