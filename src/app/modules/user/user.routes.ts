import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.get(
  '/get-user/:userId',
  auth(USER_ROLE.admin),
  UserController.getUserById
);

router.patch(
  '/edit-user-email/:userId',
  auth(USER_ROLE.admin),
  UserController.editUserEmail
);

export const UserRoutes = router;
