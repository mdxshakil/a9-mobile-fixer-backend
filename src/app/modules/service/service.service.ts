/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Prisma, Service } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

const addNewService = async (payload: Service) => {
  const result = await prisma.service.create({
    data: payload,
  });

  return result;
};

const getAllService = async (
  paginationOptions: IPaginationOptions,
  filterOptions: { searchTerm: string; category: string }
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filter } = filterOptions;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ['title'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  andConditions.push({
    OR: ['status'].map(field => ({
      [field]: {
        equals: 'live',
      },
    })),
  });

  if (filter.category !== '') {
    andConditions.push({
      AND: Object.keys(filter).map(key => ({
        [key]: {
          equals: (filter as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : { status: 'live' };

  const result = await prisma.service.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    take: limit,
    skip,
  });

  const total = await prisma.service.count({
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

const getUpcomingServices = async () => {
  const result = await prisma.service.findMany({
    where: {
      status: 'upcoming',
    },
  });

  return result;
};

const getServicesForHomePage = async () => {
  const result = await prisma.service.findMany({
    where: {
      status: 'live',
    },
    take: 6,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return result;
};

const getServicesForAdminDashboard = async (
  paginationOptions: IPaginationOptions,
  filterOptions: { filter: string }
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { filter } = filterOptions;

  let andConditions = [];

  if (filter) {
    if (filter === 'live') {
      andConditions.push({
        status: 'live',
      });
    } else if (filter === 'upcoming') {
      andConditions.push({
        status: 'upcoming',
      });
    } else if (filter === 'all') {
      andConditions = [];
    }
  }

  // @ts-ignore
  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.service.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    take: limit,
    skip,
  });

  const total = await prisma.service.count({
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

const deleteService = async (serviceId: string) => {
  const isBooked = await prisma.booking.findFirst({
    where: {
      serviceId,
    },
  });

  if (isBooked) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Can't delete a service which is booked"
    );
  }
  
  const result = await prisma.service.delete({
    where: {
      id: serviceId,
    },
  });

  return result;
};

const getServiceById = async (serviceId: string) => {
  const result = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  return result;
};

const editService = async (serviceId: string, payload: Partial<Service>) => {
  const result = await prisma.service.update({
    where: {
      id: serviceId,
    },
    data: { ...payload },
  });

  return result;
};

export const ServicesService = {
  addNewService,
  getAllService,
  getUpcomingServices,
  getServicesForHomePage,
  getServicesForAdminDashboard,
  deleteService,
  getServiceById,
  editService,
};
