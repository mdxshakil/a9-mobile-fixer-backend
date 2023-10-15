import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { BookingController } from './booking.controller';

const router = express.Router();

router.get(
  '/check-remaining-slots',
  auth(USER_ROLE.user),
  BookingController.checkRemainingSlots
);

router.post(
  '/confirm-booking',
  auth(USER_ROLE.user),
  BookingController.confirmBooking
);

router.get(
  '/my-bookings/:profileId',
  auth(USER_ROLE.user),
  BookingController.getMyBookings
);

router.get(
  '/get-all-bookings',
  auth(USER_ROLE.admin),
  BookingController.getAllBookings
);

router.patch(
  '/update-booking-status',
  auth(USER_ROLE.admin),
  BookingController.updateBookingStatus
);

export const BookingRoutes = router;