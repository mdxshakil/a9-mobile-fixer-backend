import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TestimonialController } from './testimonial.controller';
import { TestimonialValidation } from './testimonial.validation';

const router = express.Router();

router.post(
  '/add-testimonial',
  auth(USER_ROLE.user),
  validateRequest(TestimonialValidation.addTestimonial),
  TestimonialController.addTestimonial
);

router.get(
  '/get-all-testimonial',
  auth(USER_ROLE.admin),
  TestimonialController.getAllTestimonialForAdminDashboard
);

router.delete(
  '/:testimonialId',
  auth(USER_ROLE.admin),
  TestimonialController.deleteTestimonial
);

router.patch(
  '/:testimonialId',
  auth(USER_ROLE.admin),
  TestimonialController.approveUnApproveTestimonial
);

router.get(
  '/get-approved-testimonial',
  TestimonialController.getApprovedTestimonials
);

export const TestimonialRoutes = router;
