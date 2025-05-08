// models/User.mjs
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  avatarUrl: { type: String },
}, {
  timestamps: true,      // adds createdAt / updatedAt
  collection: 'users',   // use the existing pause_reflexo.users
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
