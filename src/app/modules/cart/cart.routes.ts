import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CartController } from './cart.controller';
import { CartValidation } from './cart.validation';

const router = express.Router();

router.post(
  '/add-to-cart',
  auth(USER_ROLE.user),
  validateRequest(CartValidation.addToCart),
  CartController.addToCart
);

router.delete(
  '/remove-from-cart/:itemId',
  auth(USER_ROLE.user),
  CartController.removeFromCart
);

router.get('/get-my-cart/:profileId', auth(USER_ROLE.user), CartController.getMyCart);

export const CartRoutes = router;
