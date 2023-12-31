import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { BookingRoutes } from '../modules/booking/booking.routes';
import { CartRoutes } from '../modules/cart/cart.routes';
import { EventRoutes } from '../modules/event/event.routes';
import { FaqRoutes } from '../modules/faq/faq.routes';
import { FeedbackRoutes } from '../modules/feedback/feedback.routes';
import { NotificationRoutes } from '../modules/notification/notification.routes';
import { ProfileRoutes } from '../modules/profile/profile.routes';
import { RatingRoutes } from '../modules/rating/rating.routes';
import { ReviewRoutes } from '../modules/review/review.routes';
import { ServiceRoutes } from '../modules/service/service.routes';
import { StatRoutes } from '../modules/stats/stats.routes';
import { TestimonialRoutes } from '../modules/testimonial/testimonial.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/blog',
    route: BlogRoutes,
  },
  {
    path: '/faq',
    route: FaqRoutes,
  },
  {
    path: '/service',
    route: ServiceRoutes,
  },
  {
    path: '/cart',
    route: CartRoutes,
  },
  {
    path: '/booking',
    route: BookingRoutes,
  },
  {
    path: '/notification',
    route: NotificationRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/rating',
    route: RatingRoutes,
  },
  {
    path: '/feedback',
    route: FeedbackRoutes,
  },
  {
    path: '/testimonial',
    route: TestimonialRoutes,
  },
  {
    path: '/stat',
    route: StatRoutes,
  },
  {
    path: '/event',
    route: EventRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
