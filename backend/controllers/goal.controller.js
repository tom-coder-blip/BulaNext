// controllers/goal.controller.js 
import Goal from "../models/Goal.js";

// === Create Goal === 
export const createGoal = async (req, res) => {
    try {
        const goal = await Goal.create({ ...req.body, userId: req.user.id });
        res.status(201).json(goal);
    } catch (err) {
        console.error(" Create Goal Error:", err);
        res.status(500).json({ message: "Failed to create goal" });
    }
};

// === Get All Goals for Current User ===
export const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.user.id }).sort({ deadline: 1 });
        res.status(200).json(goals);
    } catch (err) {
        console.error(" Get Goals Error:", err);
        res.status(500).json({ message: "Failed to fetch goals" });
    }
};

// === Update Goal === 
export const updateGoal = async (req, res) => {
    try {
        const updatedGoal = await Goal.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, // ensure user owns the goal 
            req.body,
            { new: true }
        );
        if (!updatedGoal) return res.status(404).json({ message: "Goal not found" });
        res.status(200).json(updatedGoal);
    } catch (err) {
        console.error(" Update Goal Error:", err);
        res.status(500).json({ message: "Failed to update goal" });
    }
};

// === Delete Goal === 
export const deleteGoal = async (req, res) => {
    try {
        const deleted = await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!deleted) return res.status(404).json({ message: "Goal not found" });
        res.status(200).json({ message: "Goal deleted successfully" });
    } catch (err) {
        console.error(" Delete Goal Error:", err);
        res.status(500).json({ message: "Failed to delete goal" });
    }
};


