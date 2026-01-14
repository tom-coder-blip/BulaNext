//defines authentication endpoints (/register and /login).

import express from 'express'; //using Express to create a router.
import { body } from 'express-validator';
import { registerUser, loginUser, deleteUser } from '../controllers/auth.controller.js';
import validateRequest from '../middleware/validate.middleware.js';
import verifyToken from '../middleware/auth.middleware.js';

const router = express.Router();

// Authentication routes
router.post(
  '/register',
  [
    body('firstname').notEmpty().withMessage('Firstname is required'),
    body('lastname').notEmpty().withMessage('Lastname is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role')
      .isIn(['mentor', 'learner'])
      .withMessage("Role must be either 'mentor' or 'learner'"),
    body('location').notEmpty().withMessage('Location is required'),
    body('interests')
      .isArray({ min: 1 })
      .withMessage('At least one interest is required'),
    validateRequest
  ],
  registerUser
);
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    validateRequest
  ],
  loginUser
);
// Delete account
router.delete('/delete', verifyToken, deleteUser);

export default router;
