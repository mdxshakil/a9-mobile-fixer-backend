import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FeedbackService } from './feedback.service';

const addFeedback = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await FeedbackService.addFeedback(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback Submitted',
    data: result,
  });
});

const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await FeedbackService.getAllFeedback(paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedbacks retrived',
    data: result,
  });
});

export const FeedbackController = {
  addFeedback,
  getAllFeedback,
};
