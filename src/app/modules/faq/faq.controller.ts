import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FaqService } from './faq.service';

const addNewFaq = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await FaqService.addNewFaq(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ created successfully',
    data: result,
  });
});

const getAllFaqs = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.getAllFaqs();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faqs retrived successfully',
    data: result,
  });
});

const deleteFaqById = catchAsync(async (req: Request, res: Response) => {
  const { faqId } = req.params;
  const result = await FaqService.deleteFaqById(faqId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq deleted successfully',
    data: result,
  });
});

const getFaqById = catchAsync(async (req: Request, res: Response) => {
  const { faqId } = req.params;
  const result = await FaqService.getFaqById(faqId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq retrived successfully',
    data: result,
  });
});

const editFaq = catchAsync(async (req: Request, res: Response) => {
  const { faqId } = req.params;
  const updatedData = req.body;

  const result = await FaqService.editFaq(faqId, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq edited successfully',
    data: result,
  });
});

export const FaqController = {
  addNewFaq,
  getAllFaqs,
  deleteFaqById,
  getFaqById,
  editFaq,
};
