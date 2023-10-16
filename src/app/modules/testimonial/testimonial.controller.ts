import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { TestimonialService } from './testimonial.service';

const addTestimonial = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await TestimonialService.addTestimonial(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial Submitted',
    data: result,
  });
});

const getAllTestimonialForAdminDashboard = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);
    const result = await TestimonialService.getAllTestimonialForAdminDashboard(
      paginationOptions
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Testimonials retrived',
      data: result,
    });
  }
);

const deleteTestimonial = catchAsync(async (req: Request, res: Response) => {
  const { testimonialId } = req.params;
  const result = await TestimonialService.deleteTestimonial(testimonialId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial deleted',
    data: result,
  });
});

const approveUnApproveTestimonial = catchAsync(
  async (req: Request, res: Response) => {
    const { testimonialId } = req.params;
    const { action } = req.query;
    const result = await TestimonialService.approveUnApproveTestimonial(
      testimonialId,
      action as string
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Testimonial status updated',
      data: result,
    });
  }
);

const getApprovedTestimonials = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TestimonialService.getApprovedTestimonials();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Testimonials retrived',
      data: result,
    });
  }
);

export const TestimonialController = {
  addTestimonial,
  getAllTestimonialForAdminDashboard,
  deleteTestimonial,
  approveUnApproveTestimonial,
  getApprovedTestimonials,
};
