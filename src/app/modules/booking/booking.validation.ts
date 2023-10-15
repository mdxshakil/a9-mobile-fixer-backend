import { z } from 'zod';

const booking = z.object({
  body: z.object({
    profileId: z.string({
      required_error: 'ProfileId required',
    }),
    serviceId: z.string({
      required_error: 'ServiceId is required',
    }),
    bookingTime: z.string({
      required_error: 'Booking time is required',
    }),
  }),
});

export const BookingValidation = {
  booking,
};
