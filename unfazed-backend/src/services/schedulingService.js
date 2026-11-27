import mongoose from 'mongoose';
import Availability from '../models/Availability.js';
import Session from '../models/Session.js';

const WEEKDAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const DAY_MS = 24 * 60 * 60 * 1000;

function parseLocalDateTime(date, time) {
  return new Date(`${date}T${time}:00Z`);
}

export function intervalsOverlap(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

export async function generateAvailableSlots({ therapistId, date, duration, clientTimezone = 'UTC' }) {
  const availability = await Availability.findOne({ therapist: therapistId });
  if (!availability) return [];

  const override = availability.overrides?.find((item) => item.date === date);
  if (override?.unavailable) return [];

  const weekday = WEEKDAYS[new Date(`${date}T12:00:00Z`).getUTCDay()];
  const windows = override ? override.windows : (availability.weekly?.get(weekday) || []);
  const durationMinutes = Number(duration);
  const bufferMinutes = availability.bufferMinutes || 0;

  const startOfDay = new Date(`${date}T00:00:00Z`).getTime();
  const endOfDay = startOfDay + DAY_MS;
  const confirmedSessions = await Session.find({
    therapist: therapistId,
    status: 'confirmed',
    start: { $lt: new Date(endOfDay) },
    end: { $gt: new Date(startOfDay) }
  }).lean();

  const slots = [];
  for (const window of windows) {
    let cursor = parseLocalDateTime(date, window.start).getTime();
    const windowEnd = parseLocalDateTime(date, window.end).getTime();

    while (cursor + durationMinutes * 60 * 1000 <= windowEnd) {
      const slotStart = new Date(cursor);
      const slotEnd = new Date(cursor + durationMinutes * 60 * 1000);
      const bufferEnd = new Date(slotEnd.getTime() + bufferMinutes * 60 * 1000);

      const blocked = availability.blockedSlots?.some((block) =>
        intervalsOverlap(slotStart, bufferEnd, new Date(block.start), new Date(block.end))
      );
      const booked = confirmedSessions.some((session) => {
        const sessionEndWithBuffer = new Date(
          new Date(session.end).getTime() + bufferMinutes * 60 * 1000
        );
        return intervalsOverlap(slotStart, bufferEnd, new Date(session.start), sessionEndWithBuffer);
      });

      if (!blocked && !booked && slotStart.getTime() > Date.now()) {
        slots.push({
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
          timezone: clientTimezone
        });
      }
      cursor += 30 * 60 * 1000;
    }
  }

  return slots;
}
