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

const deleteBlogById = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const result = await BlogService.deleteBlogById(blogId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  });
});

const getBlogById = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const result = await BlogService.getBlogById(blogId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog retrived successfully',
    data: result,
  });
});

const editBlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const updatedData = req.body;

  const result = await BlogService.editBlog(blogId, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog edited successfully',
    data: result,
  });
});

const getLatestBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getLatestBlogs();

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
  deleteBlogById,
  getBlogById,
  editBlog,
  getLatestBlogs,
};
