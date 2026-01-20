import express from 'express';
import verifyToken from '../middleware/auth.middleware.js';
import { sendRequest, respondRequest, listRequests } from '../controllers/matchRequests.controller.js';

const router = express.Router();

// All match request routes require authentication
router.use(verifyToken);

// === Match Request Endpoints ===
router.post('/send', verifyToken, sendRequest);
router.post('/respond', verifyToken, respondRequest);
router.get('/list', verifyToken, listRequests);

export default router;