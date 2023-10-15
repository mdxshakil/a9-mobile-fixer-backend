import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/add-review',
  auth(USER_ROLE.user),
  validateRequest(ReviewValidation.addReview),
  ReviewController.addReview
);

router.get('/:serviceId', ReviewController.getAllReviews);

export const ReviewRoutes = router;
