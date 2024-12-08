import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Agenda } from 'agenda';
import { authRoutes } from './routes/auth.js';
import { sequenceRoutes } from './routes/sequences.js';
import { emailRoutes } from './routes/emails.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/email-sequence';

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Initialize Agenda
export const agenda = new Agenda({ db: { address: MONGODB_URI } });

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/sequences', sequenceRoutes);
app.use('/api/emails', emailRoutes);

// Start Agenda
(async function() {
  await agenda.start();
  console.log('Agenda started');
})();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});