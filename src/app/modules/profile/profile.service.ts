import { Profile, USER_ROLE, User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

const getProfile = async (profileId: string): Promise<Profile | null> => {
  const result = await prisma.profile.findUnique({
    where: {
      id: profileId,
    },
    include: {
      user: {
        select: {
          email: true,
          role: true,
        },
      },
    },
  });

  return result;
};

const getUsers = async (
  paginationOptions: IPaginationOptions,
  filterOptions: { filter: string }
) => {
  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  let andConditions = [];

  if (filterOptions) {
    if (filterOptions.filter === 'admin') {
      andConditions.push({
        user: {
          role: USER_ROLE.admin,
        },
      });
    } else if (filterOptions.filter === 'user') {
      andConditions.push({
        user: {
          role: USER_ROLE.user,
        },
      });
    } else if (filterOptions.filter === 'super_admin') {
      andConditions.push({
        user: {
          role: USER_ROLE.super_admin,
        },
      });
    } else {
      andConditions = [];
    }
  }

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.profile.findMany({
    where: whereConditions,
    include: {
      user: {
        select: {
          email: true,
          role: true,
          id: true,
        },
      },
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    take: limit,
    skip,
  });

  const total = await prisma.profile.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
      pageCount: Math.ceil(total / limit) || 1,
    },
    data: result,
  };
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

const changeUserRole = async (
  userId: string,
  updatedRole: string
): Promise<User | null> => {
  let newRole;

  if (
    updatedRole === USER_ROLE.admin ||
    updatedRole === USER_ROLE.user ||
    updatedRole === USER_ROLE.super_admin
  ) {
    newRole = updatedRole;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user role');
  }

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: newRole,
    },
  });

  return result;
};

const deleteUser = async (userId: string) => {
  const result = await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return result;
};

export const ProfileService = {
  getProfile,
  getUsers,
  editProfile,
  changeUserRole,
  deleteUser,
};
