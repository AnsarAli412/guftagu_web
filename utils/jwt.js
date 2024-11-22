const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (userId) => {
  return jwt.sign({userId: userId},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRE_IN});
};

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach decoded token to req.user
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or Expired Token' });
  }
};

const getIdFromToken = (req)=>{
  const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        return userId;
}

module.exports = { generateToken, verifyToken, getIdFromToken };
