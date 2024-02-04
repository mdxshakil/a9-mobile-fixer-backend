/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Booking, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { ITransactionClient } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

const checkRemainingSlots = async (serviceId: string, bookingTime: string) => {
  const selectedService = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!selectedService) {
    // Handle the case when the service doesn't exist
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  // Find the total booking count of that service on the selected date
  const previousBookingCount = await prisma.booking.count({
    where: {
      serviceId: serviceId,
      bookingTime: bookingTime,
    },
  });

  // If no slots left, throw an error
  if (previousBookingCount >= selectedService.slotsPerDay) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No slots left');
  }

  // Return how many slots are left for the service on that day
  return {
    slotsLeft: selectedService.slotsPerDay - previousBookingCount,
  };
};

const confirmBooking = async (payload: Booking) => {
  await prisma.$transaction(async (tc: ITransactionClient): Promise<void> => {
    //delete service from user cart
    // if (cartItemId) {
    //   await tc.cart.delete({
    //     where: {
    //       id: cartItemId,
    //     },
    //   });
    // }
    //confirm booking
    await tc.booking.create({
      data: { ...payload },
    });
  });

  return {
    message: 'Order placed successfully',
  };
};

const cancelBooking = async (bookingId: string) => {
  let result;
  await prisma.$transaction(async (tc: ITransactionClient): Promise<void> => {
    const selectedBooking = await tc.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (
      selectedBooking?.status === 'completed' ||
      selectedBooking?.status === 'rejected'
    ) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Can not cancel a booking after it is rejected or completed'
      );
    }

    result = await tc.booking.delete({
      where: {
        id: bookingId,
      },
    });
  });

  return result;
};

const getMyBookings = async (
  profileId: string,
  paginationOptions: IPaginationOptions,
  filterOptions: { filter: string }
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { filter } = filterOptions;

  let andConditions = [];

  andConditions.push({
    profileId,
  });

  if (filter) {
    if (filter === 'pending') {
      andConditions.push({
        status: 'pending',
      });
    } else if (filter === 'completed') {
      andConditions.push({
        status: 'completed',
      });
    } else if (filter === 'rejected') {
      andConditions.push({
        status: 'rejected',
      });
    } else if (filter === 'all') {
      andConditions = [];
    }
  }

  // @ts-ignore
  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : { profileId };

  const result = await prisma.booking.findMany({
    where: whereConditions,
    include: {
      service: true,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    take: limit,
    skip,
  });

  const total = await prisma.booking.count({
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

const getAllBookings = async (
  paginationOptions: IPaginationOptions,
  filterOptions: { filter: string }
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { filter } = filterOptions;

  let andConditions = [];

  if (filter) {
    if (filter === 'pending') {
      andConditions.push({
        status: 'pending',
      });
    } else if (filter === 'completed') {
      andConditions.push({
        status: 'completed',
      });
    } else if (filter === 'rejected') {
      andConditions.push({
        status: 'rejected',
      });
    } else if (filter === 'all') {
      andConditions = [];
    }
  }

  // @ts-ignore
  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.booking.findMany({
    where: whereConditions,
    include: {
      service: true,
      profile: true,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    take: limit,
    skip,
  });

  const total = await prisma.booking.count({
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

const updateBookingStatus = async (bookingId: string, action: string) => {
  await prisma.$transaction(async (tc: ITransactionClient): Promise<void> => {
    const selectedBooking = await tc.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        service: true,
      },
    });

    if (action === 'reject') {
      //update the booking status
      await tc.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          status: 'rejected',
        },
      });
      // create the notification
      await tc.notification.create({
        data: {
          content: `Your ${selectedBooking?.service.title} was rejected that you placed on ${selectedBooking?.bookingTime}`,
          profileId: selectedBooking?.profileId as string,
        },
      });
    } else if (action === 'complete') {
      await tc.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          status: 'completed',
        },
      });
      // create the notification
      await tc.notification.create({
        data: {
          content: `Your ${selectedBooking?.service.title} was completed that you placed on ${selectedBooking?.bookingTime}`,
          profileId: selectedBooking?.profileId as string,
        },
      });
    }
  });

  return {
    message: 'Booking status updated',
  };
};

const getSingleBooking = async (serviceId: string, profileId: string) => {
  const result = await prisma.booking.findFirst({
    where: {
      serviceId,
      profileId,
      OR: [{ status: 'completed' }, { status: 'rejected' }],
    },
  });

  return result;
};

const checkServicePurchasedOrNot = async (profileId: string) => {
  const result = await prisma.booking.findFirst({
    where: {
      profileId,
      OR: [{ status: 'completed' }, { status: 'rejected' }],
    },
  });

  return result;
};

export const BookingService = {
  checkRemainingSlots,
  confirmBooking,
  cancelBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  getSingleBooking,
  checkServicePurchasedOrNot,
};
