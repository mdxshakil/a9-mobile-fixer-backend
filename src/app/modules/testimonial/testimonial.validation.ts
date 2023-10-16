import { z } from 'zod';

const experience = ['good', 'very_good', 'average'];

const addTestimonial = z.object({
  body: z.object({
    profileId: z.string({
      required_error: 'Profile id is required',
    }),
    message: z.string({
      required_error: 'Message is required',
    }),
    experience: z.enum([...experience] as [string, ...string[]], {
      required_error: 'Experience is required',
    }),
  }),
});

export const TestimonialValidation = {
  addTestimonial,
};
