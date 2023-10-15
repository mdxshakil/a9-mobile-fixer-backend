import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { NotificationService } from './notification.service';

const getMyNotifications = catchAsync(async (req: Request, res: Response) => {
  const { profileId } = req.params;

  const result = await NotificationService.getMyNotifications(
    profileId as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notifications retrived successfully',
    data: result,
  });
});

export const NotificationController = {
  getMyNotifications,
};
