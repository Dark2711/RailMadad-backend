// middleware/adminMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (user && user.isAdmin) {
      req.user = user;
      next();
    } else {
      res.status(403).json({ message: "Admin access denied" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = adminMiddleware;
