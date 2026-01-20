// models/Message.js 
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
    {
        conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        body: { type: String, trim: true },
        imageUrl: { type: String, default: null },
        readAt: { type: Date, default: null },
        editedAt: { type: Date, default: null },
        hiddenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }]
    },
    { timestamps: true }
);

// Indexes for performance 
MessageSchema.index({ conversation: 1, createdAt: -1 });
MessageSchema.index({ recipient: 1, readAt: 1 });
MessageSchema.index({ hiddenBy: 1 });

export default mongoose.model('Message', MessageSchema);