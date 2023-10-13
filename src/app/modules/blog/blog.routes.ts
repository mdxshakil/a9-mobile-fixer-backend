import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/add-new-blog',
  auth(USER_ROLE.admin),
  validateRequest(BlogValidation.createBlog),
  BlogController.addNewBlog
);

router.get('/get-all-blogs', BlogController.getAllBlogs);

export const BlogRoutes = router;
