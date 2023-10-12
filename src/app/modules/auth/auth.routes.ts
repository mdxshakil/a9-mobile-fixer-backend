import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.signup),
  AuthController.signUp
);

router.post(
  '/login',
  validateRequest(AuthValidation.login),
  AuthController.login
);

router.get(
  '/persist-login',
  auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.super_admin),
  AuthController.persistLogin
);

export const AuthRoutes = router;
