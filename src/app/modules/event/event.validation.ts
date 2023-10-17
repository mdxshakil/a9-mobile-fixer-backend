import { z } from 'zod';

const createEvent = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    venue: z.string({
      required_error: 'Venue is required',
    }),
    eventDate: z.string({
      required_error: 'Event Date is required',
    }),
    banner: z.string({
      required_error: 'Banner is required',
    }),
  }),
});

export const EventValidation = {
  createEvent,
};
