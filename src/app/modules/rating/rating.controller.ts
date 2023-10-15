import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { RatingService } from './rating.service';

const addRating = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await RatingService.addRating(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rating Submitted',
    data: result,
  });
});

const checkRatingGivenOrNot = catchAsync(
  async (req: Request, res: Response) => {
    const { serviceId, profileId } = req.query;
    const result = await RatingService.checkRatingGivenOrNot(
      serviceId as string,
      profileId as string
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Rating status retrived',
      data: result,
    });
  }
);

export const RatingController = {
  addRating,
  checkRatingGivenOrNot,
};
