// models/User.mjs
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatarUrl: { type: String } // optional profile picture
  });

// Prevent recompilation on hot reload
export default mongoose.models.User || mongoose.model('User', UserSchema);
