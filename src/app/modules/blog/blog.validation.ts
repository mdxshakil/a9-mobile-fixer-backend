import { z } from 'zod';

const createBlog = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title required',
    }),
    description: z.string({
      required_error: 'Descrition is required',
    }),
    profileId: z.string({
      required_error: 'ProfileId is required',
    }),
  }),
});

export const BlogValidation = {
  createBlog,
};
