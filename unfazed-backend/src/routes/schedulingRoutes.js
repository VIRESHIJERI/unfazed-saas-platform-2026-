import { Router } from 'express';
import {
  checkSlugAvailability,
  createBooking,
  getAvailability,
  getSlots,
  getTherapistSessions,
  saveAvailability
} from '../controllers/schedulingController.js';

const router = Router();

router.get('/slug-availability/:slug', checkSlugAvailability);
router.get('/public/:slug/availability', getAvailability);
router.get('/public/:slug/slots', getSlots);
router.post('/bookings', createBooking);
router.get('/therapists/:therapistId/sessions', getTherapistSessions);
router.get('/therapists/:therapistId/availability', getAvailability);
router.put('/therapists/:therapistId/availability', saveAvailability);

export default router;
