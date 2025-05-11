  // models/User.mjs
  import mongoose from 'mongoose';

  const UserSchema = new mongoose.Schema({
    name:      { type: String, required: true },
    email:     { type: String, required: true, unique: true },
    password:  { type: String, required: true },       // <- nécessaire pour bcrypt
    role:      { type: String, default: 'user' },      // <- exemple : 'admin', 'user'
    avatarUrl: { type: String },                       // optionnel
  }, {
    timestamps: true,
    collection: 'users',
  });

  export default mongoose.models.User || mongoose.model('User', UserSchema);
