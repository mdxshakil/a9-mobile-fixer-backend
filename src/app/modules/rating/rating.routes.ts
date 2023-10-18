import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RatingController } from './rating.controller';
import { RatingValidation } from './rating.validation';

const router = express.Router();

router.post(
  '/add-rating',
  auth(USER_ROLE.user),
  validateRequest(RatingValidation.addRating),
  RatingController.addRating
);

router.get(
  '/check-rating-status',
  auth(USER_ROLE.user),
  RatingController.checkRatingGivenOrNot
);

router.get(
  '/get-service-rating/:serviceId',
  RatingController.getRatingOfAService
);

export const RatingRoutes = router;
