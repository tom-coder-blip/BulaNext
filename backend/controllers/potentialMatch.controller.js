// controllers/potentialMatch.controller.js
import User from "../models/User.js";

// Learner → Mentor
export const getPotentialMentors = async (req, res) => {
  try {
    const learner = await User.findById(req.user.id);
    if (!learner || learner.role !== "learner") {
      return res.status(403).json({ message: "Access denied" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {
      role: "mentor",
      interests: { $in: learner.interests },
      location: learner.location,
    };

    const total = await User.countDocuments(filter);
    const mentors = await User.find(filter)
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({ total, page, pages: Math.ceil(total / limit), data: mentors });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Mentor → Learner
export const getPotentialLearners = async (req, res) => {
  try {
    const mentor = await User.findById(req.user.id);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(403).json({ message: "Access denied" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {
      role: "learner",
      interests: { $in: mentor.interests },
      location: mentor.location,
    };

    const total = await User.countDocuments(filter);
    const learners = await User.find(filter)
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({ total, page, pages: Math.ceil(total / limit), data: learners });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


