import mongoose from 'mongoose';

const windowSchema = new mongoose.Schema({
  start: { type: String, required: true },
  end: { type: String, required: true }
}, { _id: false });

const availabilitySchema = new mongoose.Schema({
  therapist: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  timezone: { type: String, default: 'Asia/Kolkata' },
  bufferMinutes: { type: Number, enum: [0, 10, 15, 30], default: 15 },
  supportedDurations: [{ type: Number, enum: [30, 45, 60, 90] }],
  weekly: {
    type: Map,
    of: [windowSchema],
    default: {}
  },
  overrides: [{
    date: { type: String, required: true },
    unavailable: { type: Boolean, default: false },
    windows: [windowSchema],
    reason: String
  }],
  blockedSlots: [{
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    reason: String
  }]
}, { timestamps: true });

availabilitySchema.index({ therapist: 1 }, { unique: true });

export default mongoose.model('Availability', availabilitySchema);
