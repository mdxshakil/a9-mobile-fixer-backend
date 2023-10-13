import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const result = await UserService.getUserById(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User info retrived',
    data: result,
  });
});

const editUserEmail = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { newEmail } = req.body;

  const result = await UserService.editUserEmail(userId, newEmail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User info retrived',
    data: result,
  });
});

export const UserController = {
  getUserById,
  editUserEmail,
};
