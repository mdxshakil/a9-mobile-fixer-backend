import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = express.Router();

router.get(
  '/check-remaining-slots',
  auth(USER_ROLE.user),
  BookingController.checkRemainingSlots
);

router.post(
  '/confirm-booking',
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.booking),
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

router.get(
  '/single-booking-info',
  auth(USER_ROLE.user),
  BookingController.getSingleBooking
);

router.delete(
  '/cancel-booking/:bookingId',
  auth(USER_ROLE.user),
  BookingController.cancelBooking
);

export const BookingRoutes = router;
