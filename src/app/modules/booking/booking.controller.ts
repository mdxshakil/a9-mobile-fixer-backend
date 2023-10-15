import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './booking.service';

const checkRemainingSlots = catchAsync(async (req: Request, res: Response) => {
  const { serviceId, bookingTime } = req.query;

  const result = await BookingService.checkRemainingSlots(
    serviceId as string,
    bookingTime as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slots info retrived',
    data: result,
  });
});

const confirmBooking = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const { cartItemId, ...payload } = data;

  const result = await BookingService.confirmBooking(payload, cartItemId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking confirmed',
    data: result,
  });
});

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const { profileId } = req.params;
  const result = await BookingService.getMyBookings(profileId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrived',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filterOptions = pick(req.query, ['filter']);

  const result = await BookingService.getAllBookings(
    paginationOptions,
    filterOptions as { filter: string }
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrived',
    data: result,
  });
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const { action, bookingId } = req.body;
  const result = await BookingService.updateBookingStatus(bookingId, action);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking status updated',
    data: result,
  });
});

export const BookingController = {
  checkRemainingSlots,
  confirmBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
};
