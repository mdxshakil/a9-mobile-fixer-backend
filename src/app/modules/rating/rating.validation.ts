import { z } from 'zod';

const addRating = z.object({
  body: z.object({
    profileId: z.string({
      required_error: 'ProfileId required',
    }),
    serviceId: z.string({
      required_error: 'ServiceId is required',
    }),
    ratingValue: z.number({
      required_error: 'Rating is required',
    }),
  }),
});

export const RatingValidation = {
  addRating,
};
