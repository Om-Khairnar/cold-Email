import express from 'express';
import { Sequence } from '../models/Sequence.js';
import { authenticateToken } from '../middleware/auth.js';
import { scheduleEmail } from '../services/emailService.js';

const router = express.Router();

// Get all sequences for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const sequences = await Sequence.find({ userId: req.user.id });
    res.json(sequences);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sequences' });
  }
});

// Create a new sequence
router.post('/', authenticateToken, async (req, res) => {
  try {
    const sequence = new Sequence({
      ...req.body,
      userId: req.user.id,
    });
    await sequence.save();
    res.status(201).json(sequence);
  } catch (error) {
    res.status(500).json({ error: 'Error creating sequence' });
  }
});

// Execute a sequence
router.post('/:id/execute', authenticateToken, async (req, res) => {
  try {
    const sequence = await Sequence.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!sequence) {
      return res.status(404).json({ error: 'Sequence not found' });
    }

    const { recipientEmail } = req.body;
    let currentTime = new Date();

    // Process nodes in sequence
    for (const node of sequence.nodes) {
      if (node.type === 'email') {
        await scheduleEmail(
          recipientEmail,
          node.data.emailSubject,
          node.data.emailBody,
          currentTime
        );
      } else if (node.type === 'delay') {
        const delayMs = calculateDelay(node.data.delayTime, node.data.delayUnit);
        currentTime = new Date(currentTime.getTime() + delayMs);
      }
    }

    res.json({ message: 'Sequence scheduled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error executing sequence' });
  }
});

function calculateDelay(time, unit) {
  const multipliers = {
    minutes: 60 * 1000,
    hours: 60 * 60 * 1000,
    days: 24 * 60 * 60 * 1000,
  };
  return time * multipliers[unit];
}

export const sequenceRoutes = router;