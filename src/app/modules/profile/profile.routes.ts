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

router.patch(
  '/edit-profile/:profileId',
  auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.super_admin),
  ProfileController.editProfile
);

export const ProfileRoutes = router;
