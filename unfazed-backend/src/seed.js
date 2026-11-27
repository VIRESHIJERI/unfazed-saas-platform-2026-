import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from './config/db.js';
import Therapist from './models/Therapist.js';
import Availability from './models/Availability.js';

await connectDatabase();

const therapist = await Therapist.findOneAndUpdate(
  { slug: 'dr-meera-iyer' },
  {
    name: 'Dr. Meera Iyer',
    slug: 'dr-meera-iyer',
    timezone: 'Asia/Kolkata',
    title: 'Clinical psychologist',
    location: 'Bengaluru'
  },
  { upsert: true, new: true, setDefaultsOnInsert: true }
);

await Availability.findOneAndUpdate(
  { therapist: therapist._id },
  {
    therapist: therapist._id,
    timezone: 'Asia/Kolkata',
    bufferMinutes: 15,
    supportedDurations: [30, 45, 60, 90],
    weekly: new Map([
      ['monday', [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '18:00' }]],
      ['tuesday', [{ start: '10:00', end: '16:00' }]],
      ['wednesday', [{ start: '09:00', end: '16:00' }]],
      ['thursday', [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '17:00' }]],
      ['friday', [{ start: '09:00', end: '16:00' }]]
    ]),
    overrides: [],
    blockedSlots: []
  },
  { upsert: true, new: true, setDefaultsOnInsert: true }
);

console.log(`Seeded ${therapist.slug}: ${therapist._id}`);
await mongoose.disconnect();
