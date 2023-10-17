import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatService } from './stats.service';

const getStats = catchAsync(async (req: Request, res: Response) => {
  const result = await StatService.getStats();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Stats retrived',
    data: result,
  });
});

export const StatController = {
  getStats,
};
