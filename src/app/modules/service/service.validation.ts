import { z } from 'zod';
import { serviceCategories } from './service.constants';

const createService = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    image: z.string({
      required_error: 'Image is required',
    }),
    cost: z.number({
      required_error: 'Cost is required',
    }),
    slotsPerDay: z.number({
      required_error: 'SlotsPerDay is required',
    }),
    category: z.enum([...serviceCategories] as [string, ...string[]], {
      required_error: 'Category is required',
    }),
  }),
});

const editService = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    cost: z.number().optional(),
    slotsPerDay: z.number().optional(),
    category: z
      .enum([...serviceCategories] as [string, ...string[]])
      .optional(),
  }),
});

export const ServiceValidation = {
  createService,
  editService,
};
