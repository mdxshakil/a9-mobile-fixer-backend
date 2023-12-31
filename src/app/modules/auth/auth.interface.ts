import { USER_ROLE } from '@prisma/client';

export type ISingupUser = {
  email: string;
  password: string;
  role: USER_ROLE;
  firstName: string;
  lastName: string;
  profilePicture: string;
  contactNo: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  email: string;
  role: string;
  id: string;
  profileId: string;
  profilePicture: string;
};
