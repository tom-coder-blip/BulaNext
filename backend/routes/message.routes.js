// routes/message.routes.js 
import express from 'express'; 
import verifyToken from '../middleware/auth.middleware.js'; 
import { upload } from "../middleware/upload.middleware.js"; 
import { 
    getMessages, 
    sendMessage, 
    markRead, 
    editMessage, 
    deleteMessageForEveryone, 
    deleteMessageForMe, 
    unreadCount 
} from '../controllers/message.controller.js';

const router = express.Router();

// All message routes require authentication 
router.use(verifyToken);

// === Message Endpoints ===
router.get('/conversations/:id/messages', getMessages);
router.post('/conversations/:id/messages', upload.single("image"), sendMessage); 
router.patch('/conversations/:id/read', markRead);

// === Message Management ===
router.get('/unread-count', unreadCount);
router.patch('/messages/:messageId', editMessage);
router.delete('/messages/:messageId', deleteMessageForEveryone);
router.delete('/messages/:messageId/hide', deleteMessageForMe);

export default router;