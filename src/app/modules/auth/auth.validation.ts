import { z } from 'zod';

const login = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const signup = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Email is required',
    }),
    firstName: z.string({
      required_error: 'First name is required',
    }),
    lastName: z.string({
      required_error: 'Last name is required',
    }),
    contactNo: z.string({
      required_error: 'ContactNo is required',
    }),
    profilePicture: z.string({
      required_error: 'Profile Picture is required',
    }),
  }),
});

export const AuthValidation = {
  login,
  signup,
};
