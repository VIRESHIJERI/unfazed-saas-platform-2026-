import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  therapist: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  duration: { type: Number, enum: [30, 45, 60, 90], required: true },
  timezone: { type: String, required: true },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed',
    index: true
  }
}, { timestamps: true });

sessionSchema.index({ therapist: 1, start: 1, end: 1 });

export default mongoose.model('Session', sessionSchema);
