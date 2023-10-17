import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { EventController } from './event.controller';
import { EventValidation } from './event.validation';

const router = express.Router();

router.post(
  '/create-event',
  auth(USER_ROLE.admin),
  validateRequest(EventValidation.createEvent),
  EventController.createEvent
);

router.get('/', EventController.getAllEvents);
router.get('/upcoming-events', EventController.getUpcomingEvents);

router.delete('/:eventId', EventController.deleteEvent);
router.patch('/:eventId', EventController.changeEventStatus);

export const EventRoutes = router;
