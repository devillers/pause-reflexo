// models/Message.js
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  company: String,
  country: String,
  phone:   String,
  message: { type: String, required: true },
  agreed:  { type: Boolean, default: false },
  sentAt:  { type: Date, default: Date.now },
});

// Eviter la recompilation multiple en développement
export default mongoose.models.Message || mongoose.model('Message', MessageSchema);
