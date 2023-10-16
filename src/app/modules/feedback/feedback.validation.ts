import { z } from 'zod';

const addFeedback = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email required',
    }),
    message: z.string({
      required_error: 'Message required',
    }),
  }),
});

export const FeedbackValidation = {
  addFeedback,
};
