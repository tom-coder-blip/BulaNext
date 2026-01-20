// routes/goal.routes.js 
import express from "express"; 
import verifyToken from "../middleware/auth.middleware.js"; 
import { createGoal, getGoals, updateGoal, deleteGoal } from "../controllers/goal.controller.js";

const router = express.Router();

// All goal routes require authentication 
router.use(verifyToken);

// === Goal Endpoints ===
router.post("/", createGoal);
router.get("/", getGoals);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

export default router;