import mongoose from 'mongoose';

const schedulingLockSchema = new mongoose.Schema({
  therapist: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  version: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('SchedulingLock', schedulingLockSchema);
