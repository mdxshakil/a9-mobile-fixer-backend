import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { CartRoutes } from '../modules/cart/cart.routes';
import { FaqRoutes } from '../modules/faq/faq.routes';
import { ProfileRoutes } from '../modules/profile/profile.routes';
import { ServiceRoutes } from '../modules/service/service.routes';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
