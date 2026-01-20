// models/Conversation.js 
import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema(
    {
        participants: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
        ],
        lastMessageAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

// Indexes for faster queries 
ConversationSchema.index({ participants: 1 });
ConversationSchema.index({ lastMessageAt: -1 });

export default mongoose.model('Conversation', ConversationSchema);