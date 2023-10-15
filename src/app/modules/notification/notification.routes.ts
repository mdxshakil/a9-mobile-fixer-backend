import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { NotificationController } from './notification.controller';

const router = express.Router();

router.get(
  '/get-my-notification/:profileId',
  auth(USER_ROLE.user),
  NotificationController.getMyNotifications
);

export const NotificationRoutes = router;
