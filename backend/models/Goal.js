// models/Goal.js 
import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    deadline: { type: Date, required: true },
    progress: { type: Number, min: 0, max: 100, default: 0 }, // enforce 0–100% 
}, { timestamps: true }); // adds createdAt & updatedAt automatically 

export default mongoose.model("Goal", goalSchema);