import mongoose from 'mongoose';

const therapistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  timezone: { type: String, default: 'Asia/Kolkata' },
  title: String,
  location: String
}, { timestamps: true });

export default mongoose.model('Therapist', therapistSchema);
