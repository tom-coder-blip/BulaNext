//This middleware checks if a request has a valid JSON Web Token (JWT) 
//in the Authorization header. It extracts the token, verifies it using the 
//secret key stored in process.env.JWT_SECRET, and if valid, 
//attaches the decoded user information to the req object for later use.

import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

export default verifyToken;