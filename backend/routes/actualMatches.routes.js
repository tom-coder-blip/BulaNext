import express from 'express';
import verifyToken from '../middleware/auth.middleware.js';
import { getMyMatches, unmatchUser} from '../controllers/actualMatches.controller.js';

const router = express.Router();

// All actual match routes require authentication
router.use(verifyToken);

// === Actual Match Endpoints ===
router.get('/myMatches', getMyMatches);
router.delete('/unmatch/:matchId', unmatchUser);

export default router;