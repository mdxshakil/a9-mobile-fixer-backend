import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { ProfileController } from './profile.controller';

const router = express.Router();

router.get(
  '/get-profile/:profileId',
  auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.super_admin),
  ProfileController.getProfile
);

router.get(
  '/get-users',
  auth(USER_ROLE.super_admin),
  ProfileController.getUsers
);

router.patch(
  '/edit-profile/:profileId',
  auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.super_admin),
  ProfileController.editProfile
);

router.patch(
  '/change-user-role',
  auth(USER_ROLE.super_admin),
  ProfileController.changeUserRole
);

router.patch(
  '/delete-user',
  auth(USER_ROLE.super_admin),
  ProfileController.deleteUser
);

export const ProfileRoutes = router;
