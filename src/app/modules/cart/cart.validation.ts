import { z } from 'zod';

const addToCart = z.object({
  body: z.object({
    profileId: z.string({
      required_error: 'ProfileId required',
    }),
    serviceId: z.string({
      required_error: 'ServiceId is required',
    }),
  }),
});

export const CartValidation = {
  addToCart,
};
