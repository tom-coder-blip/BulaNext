// controllers/actualMatching.controller.js
import Match from "../models/Match.js";
import MatchRequest from "../models/MatchRequest.js";
import User from "../models/User.js";

// Get my matches
export const getMyMatches = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    let matches;
    if (user.role === "learner") {
      matches = await Match.find({ learner: userId }).populate("learner").populate("mentor");
    } else {
      matches = await Match.find({ mentor: userId }).populate("learner").populate("mentor");
    }

    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// UNMATCH USER — updates both users' statuses to Unmatched
export const unmatchUser = async (req, res) => {
  try {
    const { matchId } = req.params;
    const userId = req.user.id;

    // Find the match
    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ message: "Match not found" });

    // Check if the logged-in user is part of this match
    if (String(match.learner) !== userId && String(match.mentor) !== userId) {
      return res.status(403).json({ message: "Not authorized to unmatch this user" });
    }

    // Reset learner → always unmatched
    await User.findByIdAndUpdate(match.learner, {
      status: "Unmatched",
      $unset: { mentor: "" }
    });

    // Update mentor: remove learner from list
    const mentor = await User.findByIdAndUpdate(
      match.mentor,
      { $pull: { learners: match.learner } },
      { new: true } // return updated mentor
    );

    // If mentor still has learners, keep them "Matched", otherwise reset to "Unmatched"
    if (mentor.learners.length === 0) {
      mentor.status = "Unmatched";
      await mentor.save();
    }

    // Delete the Match record
    await Match.findByIdAndDelete(matchId);

    // Delete related MatchRequest(s)
    await MatchRequest.deleteMany({
      $or: [
        { from: match.learner, to: match.mentor, status: "accepted" },
        { from: match.mentor, to: match.learner, status: "accepted" }
      ]
    });

    return res.status(200).json({ message: "Unmatched successfully" });
  } catch (err) {
    console.error("Error unmatching:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

