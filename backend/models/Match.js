// models/Match.js 
import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    learner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    matchedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Match", matchSchema);