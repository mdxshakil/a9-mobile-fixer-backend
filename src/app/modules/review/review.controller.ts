import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './review.service';

const addReview = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await ReviewService.addReview(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Added',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const result = await ReviewService.getAllReviews(serviceId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews retrived',
    data: result,
  });
});

export const ReviewController = {
  addReview,
  getAllReviews,
};
