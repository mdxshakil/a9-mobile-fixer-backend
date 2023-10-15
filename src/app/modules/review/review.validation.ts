import { z } from 'zod';

const addReview = z.object({
  body: z.object({
    profileId: z.string({
      required_error: 'ProfileId required',
    }),
    serviceId: z.string({
      required_error: 'ServiceId is required',
    }),
    comment: z.string({
      required_error: 'Comment is required',
    }),
  }),
});

export const ReviewValidation = {
  addReview,
};
