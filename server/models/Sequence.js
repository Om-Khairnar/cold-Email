import mongoose from 'mongoose';

const nodeSchema = new mongoose.Schema({
  id: String,
  type: String,
  position: {
    x: Number,
    y: Number,
  },
  data: {
    label: String,
    emailSubject: String,
    emailBody: String,
    delayTime: Number,
    delayUnit: String,
    sourceType: String,
  },
});

const edgeSchema = new mongoose.Schema({
  id: String,
  source: String,
  target: String,
});

const sequenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  nodes: [nodeSchema],
  edges: [edgeSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Sequence = mongoose.model('Sequence', sequenceSchema);