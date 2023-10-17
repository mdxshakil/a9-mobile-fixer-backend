import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { EventService } from './event.service';

const createEvent = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await EventService.createEvent(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event created',
    data: result,
  });
});

const getAllEvents = catchAsync(async (req: Request, res: Response) => {
  const result = await EventService.getAllEvents();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Events retrived',
    data: result,
  });
});

const getUpcomingEvents = catchAsync(async (req: Request, res: Response) => {
  const result = await EventService.getUpcomingEvents();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Upcoming Events retrived',
    data: result,
  });
});

const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const result = await EventService.deleteEvent(eventId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event deleted',
    data: result,
  });
});

const changeEventStatus = catchAsync(async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const { action } = req.query;
  const result = await EventService.changeEventStatus(
    eventId as string,
    action as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event status updated',
    data: result,
  });
});

export const EventController = {
  createEvent,
  getAllEvents,
  getUpcomingEvents,
  deleteEvent,
  changeEventStatus,
};
