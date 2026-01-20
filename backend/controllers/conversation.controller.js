import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import mongoose from 'mongoose';

// === Helper: Ensure user is a participant ===
export const ensureParticipant = (conversation, userId) => {
  const ok = conversation.participants.some(p => p.toString() === userId.toString());
  if (!ok) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }
};

// === Create or Get Conversation ===
export const getOrCreateConversation = async (req, res) => {
  const { recipientId } = req.body;
  const userId = req.user.id;

  if (!recipientId || !mongoose.isValidObjectId(recipientId)) {
    return res.status(400).json({ message: 'Valid recipientId is required' });
  }
  if (recipientId === userId) {
    return res.status(400).json({ message: 'Cannot start conversation with yourself' });
  }

  // try find existing conversation with both participants
  let convo = await Conversation.findOne({
    participants: { $all: [userId, recipientId], $size: 2 }
  });

  if (!convo) {
    convo = await Conversation.create({
      participants: [userId, recipientId],
      lastMessageAt: new Date()
    });
  }

  res.status(200).json(convo);
};

// === Get Conversation with Specific User ===
export const getConversationWithUser = async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user.id;

  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ message: 'Invalid userId' });
  }

  const convo = await Conversation.findOne({
    participants: { $all: [currentUserId, userId], $size: 2 }
  });

  if (!convo) {
    return res.status(404).json({ message: "No conversation found" });
  }

  res.json(convo);
};

// === List All Conversations for Current User ===
export const listConversations = async (req, res) => {
  const userId = req.user.id;

  const convos = await Conversation.find({ participants: userId })
    .sort({ lastMessageAt: -1 })
    .populate({
      path: 'participants',
      select: 'firstname lastname email profilePic role'
    });

  // Attach unread count per conversation
  const convosWithUnread = await Promise.all(
    convos.map(async (convo) => {
      const unreadCount = await Message.countDocuments({
        conversation: convo._id,
        recipient: userId,
        readAt: null
      });

      return {
        ...convo.toObject(),
        unreadCount,
      };
    })
  );

  res.json(convosWithUnread);
};
