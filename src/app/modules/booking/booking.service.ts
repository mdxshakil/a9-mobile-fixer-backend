/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Booking, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { ITransactionClient } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

const checkRemainingSlots = async (serviceId: string, bookingTime: string) => {
  // find the selected service
  const selectedService = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });
  //find total booing of that service on selected date
  const previousBookingCount = await prisma.booking.count({
    where: {
      serviceId: serviceId,
      bookingTime: bookingTime,
    },
  });
  //if no slots left then throw error
  if (selectedService && previousBookingCount > selectedService?.slotsPerDay) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No slots left');
  }

  //return how many slots left fo the service on that day
  return {
    slotsLeft:
      selectedService && selectedService?.slotsPerDay - previousBookingCount,
  };
};

const confirmBooking = async (payload: Booking, cartItemId: string) => {
  await prisma.$transaction(async (tc: ITransactionClient): Promise<void> => {
    //delete service from user cart
    await tc.cart.delete({
      where: {
        id: cartItemId,
      },
    });
    //confirm booking
    await tc.booking.create({
      data: { ...payload },
    });
  });

  return {
    message: 'Order placed successfully',
  };
};

const getMyBookings = async (profileId: string) => {
  const result = await prisma.booking.findMany({
    where: {
      profileId,
    },
    include: {
      service: true,
    },
  });
  return result;
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

export const BookingService = {
  checkRemainingSlots,
  confirmBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
};
