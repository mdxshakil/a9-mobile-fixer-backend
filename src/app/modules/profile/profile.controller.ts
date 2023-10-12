import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const { profileId } = req.params;

  const result = await ProfileService.getProfile(profileId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile info retrived',
    data: result,
  });
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
  ]);
  const filterOptions = pick(req.query, ['filter']);

  const result = await ProfileService.getUsers(
    paginationOptions,
    filterOptions as { filter: string }
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins. info retrived',
    data: result,
  });
});

const editProfile = catchAsync(async (req: Request, res: Response) => {
  const { profileId } = req.params;
  const { payload } = req.body;

  const result = await ProfileService.editProfile(profileId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile info retrived',
    data: result,
  });
});

const changeUserRole = catchAsync(async (req: Request, res: Response) => {
  const { userId, newRole } = req.body;

  const result = await ProfileService.changeUserRole(userId, newRole);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User role updated.',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.query;

  const result = await ProfileService.deleteUser(userId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted',
    data: result,
  });
});

export const ProfileController = {
  getProfile,
  editProfile,
  getUsers,
  changeUserRole,
  deleteUser,
};
