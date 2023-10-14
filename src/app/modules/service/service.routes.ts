import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';

const router = express.Router();

router.post(
  '/add-new-service',
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidation.createService),
  ServiceController.addNewService
);

router.get('/get-all-service', ServiceController.getAllService);

router.get('/get-upcoming-services', ServiceController.getUpcomingServices);

router.get('/get-homepage-services', ServiceController.getServicesForHomePage);

router.get(
  '/get-dashboard-services',
  auth(USER_ROLE.admin),
  ServiceController.getServicesForAdminDashboard
);

router.delete(
  '/:serviceId',
  auth(USER_ROLE.admin),
  ServiceController.deleteService
);

router.get('/:serviceId', ServiceController.getServiceById);

router.patch('/:serviceId', ServiceController.editService);

export const ServiceRoutes = router;
