//defines exactly what gets stored in MongoDB when you register/login users.

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['learner', 'mentor', 'admin'], default: 'learner' },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now },
  interests: [String],
  skills: { type: [String], default: [] },
  location: { type: String },
  goals: { type: String },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // if learner → mentor ID
  learners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // if mentor → learner IDs
  profilePicture: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/847/847969.png" // default avatar
  },
  status: {
    type: String,
    enum: ["Matched", "Unmatched"],
    default: "Unmatched"
  }
});

export default mongoose.model('User', userSchema);