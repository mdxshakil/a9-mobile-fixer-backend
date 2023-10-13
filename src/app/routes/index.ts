import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { ProfileRoutes } from '../modules/profile/profile.routes';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
