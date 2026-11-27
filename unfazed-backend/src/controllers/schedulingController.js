import mongoose from 'mongoose';
import Availability from '../models/Availability.js';
import Session from '../models/Session.js';
import SchedulingLock from '../models/SchedulingLock.js';
import Therapist from '../models/Therapist.js';
import { generateAvailableSlots, intervalsOverlap } from '../services/schedulingService.js';

export async function getAvailability(req, res) {
  try {
    const therapist = req.params.slug
      ? await Therapist.findOne({ slug: req.params.slug })
      : await Therapist.findById(req.params.therapistId);
    if (!therapist) return res.status(404).json({ message: 'Therapist not found' });

    const availability = await Availability.findOne({ therapist: therapist._id }).lean();
    res.json({ therapist, availability });
  } catch (error) {
    res.status(500).json({ message: 'Unable to load availability' });
  }
}

export async function checkSlugAvailability(req, res) {
  const slug = String(req.params.slug || '').toLowerCase();
  if (!/^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])?$/.test(slug)) {
    return res.status(400).json({ message: 'Use 3–30 letters, numbers, or hyphens for the profile link' });
  }

  try {
    const therapistExists = await Therapist.exists({ slug });
    res.json({ slug, available: !therapistExists });
  } catch {
    res.status(503).json({ message: 'Profile link availability is temporarily unavailable' });
  }
}

export async function saveAvailability(req, res) {
  try {
    const therapistId = req.params.therapistId;
    const availability = await Availability.findOneAndUpdate(
      { therapist: therapistId },
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(availability);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getSlots(req, res) {
  try {
    const therapist = await Therapist.findOne({ slug: req.params.slug });
    if (!therapist) return res.status(404).json({ message: 'Therapist not found' });

    const slots = await generateAvailableSlots({
      therapistId: therapist._id,
      date: req.query.date,
      duration: req.query.duration || 60,
      clientTimezone: req.query.timezone || 'UTC'
    });
    res.json({ therapist, slots });
  } catch (error) {
    res.status(500).json({ message: 'Unable to generate slots' });
  }
}

export async function createBooking(req, res) {
  const { therapistId, start, duration, clientName, clientEmail, timezone } = req.body;
  if (!therapistId || !start || !duration || !clientName || !clientEmail) {
    return res.status(400).json({ message: 'Therapist, start time, duration, and client details are required' });
  }

  const session = await mongoose.startSession();
  try {
    let booking;
    await session.withTransaction(async () => {
      await SchedulingLock.findOneAndUpdate(
        { therapist: therapistId },
        { $setOnInsert: { therapist: therapistId }, $inc: { version: 1 } },
        { upsert: true, session }
      );

      const availability = await Availability.findOne({ therapist: therapistId }).session(session);
      if (!availability?.supportedDurations?.includes(Number(duration))) {
        throw Object.assign(new Error('This session duration is not supported'), { status: 400 });
      }

      const slotStart = new Date(start);
      const slotEnd = new Date(slotStart.getTime() + Number(duration) * 60 * 1000);
      if (Number.isNaN(slotStart.getTime()) || slotStart <= new Date()) {
        throw Object.assign(new Error('The selected time is no longer available'), { status: 409 });
      }

      const bufferMinutes = availability.bufferMinutes || 0;
      const conflictStart = slotStart;
      const conflictEnd = new Date(slotEnd.getTime() + bufferMinutes * 60 * 1000);

      const existing = await Session.findOne({
        therapist: therapistId,
        status: 'confirmed',
        start: { $lt: conflictEnd },
        end: { $gt: conflictStart }
      }).session(session);
      if (existing) {
        throw Object.assign(new Error('This time has just been booked'), { status: 409 });
      }

      [booking] = await Session.create([{
        therapist: therapistId,
        clientName,
        clientEmail,
        start: slotStart,
        end: slotEnd,
        duration: Number(duration),
        timezone,
        status: 'confirmed'
      }], { session });
    });

    res.status(201).json({ booking });
  } catch (error) {
    res.status(error.status || 409).json({ message: error.message || 'Unable to complete booking' });
  } finally {
    await session.endSession();
  }
}

export async function getTherapistSessions(req, res) {
  const sessions = await Session.find({
    therapist: req.params.therapistId,
    status: { $ne: 'cancelled' }
  }).sort({ start: 1 }).lean();
  res.json(sessions);
}
