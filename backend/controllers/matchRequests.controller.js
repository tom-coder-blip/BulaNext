// controllers/matchRequests.controller.js
import User from "../models/User.js";
import Match from "../models/Match.js";
import MatchRequest from "../models/MatchRequest.js";

// Send request
export const sendRequest = async (req, res) => {
  try {
    const toId = req.body.to;
    const fromId = req.user.id;

    if (fromId === toId) return res.status(400).json({ message: "Cannot match yourself" });

    const fromUser = await User.findById(fromId);
    const toUser = await User.findById(toId);
    if (!fromUser || !toUser) return res.status(404).json({ message: "User not found" });

    if (fromUser.role === "learner") {
      const existingMatch = await Match.findOne({ learner: fromId });
      if (existingMatch) return res.status(400).json({ message: "Learner already has a mentor" });
    }

    if (toUser.role === "learner") {
      const learnerHasMatch = await Match.findOne({ learner: toId });
      if (learnerHasMatch) return res.status(400).json({ message: "This learner already has a mentor" });
    }

    const existingPending = await MatchRequest.findOne({
      status: "pending",
      $or: [{ from: fromId, to: toId }, { from: toId, to: fromId }],
    });
    if (existingPending) return res.status(400).json({ message: "Request already exists" });

    const request = await MatchRequest.create({ from: fromId, to: toId });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Respond to request
export const respondRequest = async (req, res) => {
  try {
    const { requestId, status } = req.body;
    const userId = req.user.id;

    const request = await MatchRequest.findById(requestId).populate("from to");
    if (!request) return res.status(404).json({ message: "Request not found" });
    if (String(request.to._id) !== userId) return res.status(403).json({ message: "Not authorized" });

    if (status === "accept") {
      request.status = "accepted";

      const learner = request.from.role === "learner" ? request.from : request.to;
      const mentor = request.from.role === "mentor" ? request.from : request.to;

      const existingMentor = await Match.findOne({ learner: learner._id });
      if (existingMentor) return res.status(400).json({ message: "This learner already has a mentor" });

      const existingMatch = await Match.findOne({ learner: learner._id, mentor: mentor._id });
      if (!existingMatch) {
        await Match.create({ learner: learner._id, mentor: mentor._id });
        await User.findByIdAndUpdate(learner._id, { mentor: mentor._id, status: "Matched" });
        await User.findByIdAndUpdate(mentor._id, { $addToSet: { learners: learner._id }, status: "Matched" });
      }

      await request.save();
      return res.json({ message: "Request accepted successfully", matched: true, learner, mentor });
    } else if (status === "reject") {
      await MatchRequest.findByIdAndDelete(requestId);
      return res.json({ message: "Request rejected and removed", matched: false });
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// List requests
export const listRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const requests = await MatchRequest.find({ $or: [{ from: userId }, { to: userId }] })
      .populate("from to", "firstname lastname role");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
