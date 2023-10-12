import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
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

const editProfile = catchAsync(async (req: Request, res: Response) => {
  const { profileId } = req.params;
  const {payload} = req.body;

  const result = await ProfileService.editProfile(profileId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile info retrived',
    data: result,
  });
});

export const ProfileController = {
  getProfile,
  editProfile,
};
