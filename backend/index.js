import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import careerRoutes from './routes/career.routes.js';
import conversationRoutes from './routes/conversation.routes.js';
import messageRoutes from './routes/message.routes.js';
import goalRoutes from './routes/goal.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// === Middleware ===
app.use(cors());
app.use(express.json());

// === Routes ===
app.use('/api/auth', authRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/convos', conversationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/goals', goalRoutes);

// === Database Connection and Server Start ===
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });