//This file handles user registration (creates a user, hashes the password, and sends a welcome email), 
// login (checks credentials and returns a JWT), and account deletion (removes the logged-in user).

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendWelcomeEmail } from "../utils/email.js";

export const registerUser = async (req, res) => {
  const { firstname, lastname, email, password, role, location, interests, experience } = req.body;

  try {
    // === Check if User Already Exists ===
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // === Hash Password ===
    const hashedPassword = await bcrypt.hash(password, 10);

    // === Create New User ===
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
      location,
      interests,
      experience,
    });

    // === Send Welcome Email ===
    await sendWelcomeEmail(user.email, user.firstname);

    res.status(201).json({ message: "User registered successfully & email sent!" });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // === Generate JWT Token ===
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error("❌ Delete Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
}; 