import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BlogService } from './blog.service';

const addNewBlog = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await BlogService.addNewBlog(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BlogService.getAllBlogs(paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs retrived successfully',
    data: result,
  });
});

export const BlogController = {
  addNewBlog,
  getAllBlogs,
};
