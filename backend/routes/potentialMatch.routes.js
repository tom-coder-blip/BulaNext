import express from 'express';
import verifyToken from '../middleware/auth.middleware.js';
import { getPotentialMentors, getPotentialLearners } from '../controllers/potentialMatch.controller.js';

const router = express.Router();

// All potential match routes require authentication
router.use(verifyToken);

// === Potential Match Endpoints ===
router.get('/potentialMentors', getPotentialMentors);
router.get('/potentialLearners', getPotentialLearners);

export default router;