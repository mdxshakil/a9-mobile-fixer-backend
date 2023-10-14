import { z } from 'zod';

const createFaq = z.object({
  body: z.object({
    question: z.string({
      required_error: 'Question required',
    }),
    answer: z.string({
      required_error: 'Answer is required',
    }),
  }),
});

const editFaq = z.object({
  body: z.object({
    question: z.string().optional(),
    answer: z.string().optional(),
  }),
});

export const FaqValidation = {
  createFaq,
  editFaq,
};
