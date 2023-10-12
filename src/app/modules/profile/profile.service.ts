import { Profile } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getProfile = async (profileId: string): Promise<Profile | null> => {
  const result = await prisma.profile.findUnique({
    where: {
      id: profileId,
    },
    include: {
      user: true,
    },
  });

  return result;
};

const editProfile = async (
  profileId: string,
  payload: Partial<Profile>
): Promise<Profile | null> => {
  const result = await prisma.profile.update({
    where: {
      id: profileId,
    },
    data: {
      firstName: payload?.firstName,
      lastName: payload?.lastName,
      contactNo: payload?.contactNo,
      profilePicture: payload?.profilePicture,
    },
  });

  return result;
};

export const ProfileService = {
  getProfile,
  editProfile,
};
