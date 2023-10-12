/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await AuthService.signUp(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Signup successful',
    data: result.message,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AuthService.login(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: result,
  });
});

const persistLogin = catchAsync(async (req: Request, res: Response) => {
  const data = req.user;
  const result = await AuthService.persistLogin(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in',
    data: result,
  });
});

export const AuthController = {
  signUp,
  login,
  persistLogin,
};
