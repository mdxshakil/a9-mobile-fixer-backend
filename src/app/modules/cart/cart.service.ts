import { Cart } from '@prisma/client';
import prisma from '../../../shared/prisma';

const addToCart = async (payload: Cart) => {
  const result = await prisma.cart.create({
    data: payload,
  });
  return result;
};

export const CartService = {
  addToCart,
};
