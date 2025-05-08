// models/Post.mjs

import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  image:       { type: String },
  category:    { type: String },
  slug:        { type: String, required: true, unique: true },
}, {
  timestamps: true,        // adds createdAt / updatedAt
  collection: 'blog_posts' // use the existing pause_reflexo.blog_posts
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
