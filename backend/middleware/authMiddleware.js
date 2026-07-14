const jwt = require('jsonwebtoken');
const User = require('../models/User');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    try {
      if (user._id) {
        const dbUser = await User.findById(user._id);
        if (!dbUser) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = dbUser;
        return next();
      }

      if (user.email) {
        const dbUser = await User.findOne({ email: user.email });
        if (!dbUser) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = dbUser;
        return next();
      }

      return res.status(401).json({ message: 'Unauthorized' });
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  });
}

module.exports = authenticateToken;