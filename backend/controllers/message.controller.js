// controllers/message.controller.js 
import Conversation from '../models/Conversation.js'; 
import Message from '../models/Message.js'; 
import { ensureParticipant } from './conversation.controller.js';

// === Get Messages in a Conversation ===
export const getMessages = async (req, res) => {
  const { id } = req.params;
  const limit = Math.min(parseInt(req.query.limit) || 30, 100);
  const before = req.query.before ? new Date(req.query.before) : null;

  const convo = await Conversation.findById(id);
  if (!convo) return res.status(404).json({ message: 'Conversation not found' });

  ensureParticipant(convo, req.user.id);

  const filter = { conversation: id };
  if (before) filter.createdAt = { $lt: before };

  const msgs = await Message.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  // Return newest at bottom for UI
  res.json(msgs.reverse());
};

// === Send Message ===
export const sendMessage = async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  const userId = req.user.id;

  const convo = await Conversation.findById(id);
  if (!convo) return res.status(404).json({ message: "Conversation not found" });

  ensureParticipant(convo, userId);
  const recipientId = convo.participants.find((p) => p.toString() !== userId.toString());

  let imageUrl = null;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }

  if (!body && !imageUrl) {
    return res.status(400).json({ message: "Message must have text or image" });
  }

  let msg = await Message.create({
    conversation: id,
    sender: userId,
    recipient: recipientId,
    body: body?.trim() || null,
    imageUrl
  });

  convo.lastMessageAt = new Date();
  await convo.save();

  // 🔑 Populate sender + recipient before sending back
  msg = await msg.populate("sender", "firstname lastname profilePic");
  msg = await msg.populate("recipient", "firstname lastname profilePic");

  res.status(201).json(msg);
};

// === Mark Messages as Read ===
export const markRead = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const convo = await Conversation.findById(id);
  if (!convo) return res.status(404).json({ message: 'Conversation not found' });

  ensureParticipant(convo, userId);

  await Message.updateMany(
    { conversation: id, recipient: userId, readAt: null },
    { $set: { readAt: new Date() } }
  );

  res.json({ ok: true });
};

// === Get Unread Count ===
export const unreadCount = async (req, res) => {
  const userId = req.user.id;

  const count = await Message.countDocuments({
    recipient: userId,
    readAt: null
  });

  res.json({ count });
};

// === Edit Message ===
export const editMessage = async (req, res) => {
  const { messageId } = req.params;
  const { body } = req.body;
  const userId = req.user.id;

  if (!body || !body.trim()) return res.status(400).json({ message: 'Message body is required' });

  const msg = await Message.findById(messageId);
  if (!msg) return res.status(404).json({ message: 'Message not found' });
  if (msg.sender.toString() !== userId) return res.status(403).json({ message: 'Not allowed' });

  msg.body = body.trim();
  msg.editedAt = new Date();
  await msg.save();

  res.json(msg);
};

// === Delete Message for Everyone ===
export const deleteMessageForEveryone = async (req, res) => {
  const { messageId } = req.params;
  const userId = req.user.id;

  const msg = await Message.findById(messageId);
  if (!msg) return res.status(404).json({ message: 'Message not found' });

  // Only the sender can delete for everyone (hard delete)
  if (msg.sender.toString() !== userId) return res.status(403).json({ message: 'Not allowed' });

  const convoId = msg.conversation;
  await Message.deleteOne({ _id: messageId });

  // Update lastMessageAt
  const last = await Message.findOne({ conversation: convoId }).sort({ createdAt: -1 });
  await Conversation.findByIdAndUpdate(convoId, { lastMessageAt: last ? last.createdAt : new Date(0) });

  res.json({ ok: true });
};

// === Delete Message for Me ===
export const deleteMessageForMe = async (req, res) => {
  const { messageId } = req.params;
  const userId = req.user.id;

  const msg = await Message.findById(messageId);
  if (!msg) return res.status(404).json({ message: 'Message not found' });

  const convo = await Conversation.findById(msg.conversation);
  if (!convo) return res.status(404).json({ message: 'Conversation not found' });
  ensureParticipant(convo, userId);

  await Message.updateOne({ _id: messageId }, { $addToSet: { hiddenBy: userId } });
  res.json({ ok: true });
};