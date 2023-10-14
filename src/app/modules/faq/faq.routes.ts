import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FaqController } from './faq.controller';
import { FaqValidation } from './faq.validation';

const router = express.Router();

router.post(
  '/add-new-faq',
  auth(USER_ROLE.admin),
  validateRequest(FaqValidation.createFaq),
  FaqController.addNewFaq
);

router.get('/get-all-faqs', FaqController.getAllFaqs);

router.delete('/:faqId', auth(USER_ROLE.admin), FaqController.deleteFaqById);

router.get('/:faqId', auth(USER_ROLE.admin), FaqController.getFaqById);

router.patch(
  '/:faqId',
  auth(USER_ROLE.admin),
  validateRequest(FaqValidation.editFaq),
  FaqController.editFaq
);

export const FaqRoutes = router;
