// routes/chat.routes.js 

import express from 'express';
import verifyToken from '../middleware/auth.middleware.js';
import { getOrCreateConversation, listConversations, getConversationWithUser } from '../controllers/conversation.controller.js';

const router = express.Router();

// All chat routes require authentication 
router.use(verifyToken);

// Conversations 
router.post('/conversations', getOrCreateConversation); 
router.get('/conversations', listConversations);
router.get('/conversations/with/:userId', getConversationWithUser);

export default router;