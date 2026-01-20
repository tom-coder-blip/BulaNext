// routes/career.routes.js 
import express from "express"; 
import { getCareers, getCareerById} from "../controllers/career.controller.js"; 

const router = express.Router(); 

// Public routes 
router.get("/", getCareers); // Browse/search careers 
router.get("/:id", getCareerById); // Career details 

export default router;