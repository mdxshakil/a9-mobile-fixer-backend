import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FeedbackController } from './feedback.controller';
import { FeedbackValidation } from './feedback.validation';

const router = express.Router();

router.post(
  '/add-feedback',
  validateRequest(FeedbackValidation.addFeedback),
  FeedbackController.addFeedback
);

router.get(
  '/get-all-feedback',
  auth(USER_ROLE.admin),
  FeedbackController.getAllFeedback
);

export const FeedbackRoutes = router;
