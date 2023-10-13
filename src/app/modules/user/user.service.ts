import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getUserById = async (userId: string): Promise<Partial<User> | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      id: true,
    },
  });

  return result;
};

const editUserEmail = async (
  userId: string,
  newEmail: string
): Promise<{ message: string }> => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email: newEmail,
    },
  });

  return { message: 'Email updated' };
};

export const UserService = {
  getUserById,
  editUserEmail,
};
