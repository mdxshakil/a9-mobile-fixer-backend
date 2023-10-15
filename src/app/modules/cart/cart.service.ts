import { Cart } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const addToCart = async (payload: Cart) => {
  const isExists = await prisma.cart.findFirst({
    where: {
      serviceId: payload.serviceId,
      profileId: payload.profileId,
    },
  });
  if (isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Item already in cart!');
  }
  const result = await prisma.cart.create({
    data: payload,
  });
  return result;
};

const removeFromCart = async (cartItemId: string) => {
  const result = await prisma.cart.delete({
    where: {
      id: cartItemId,
    },
  });
  return result;
};

const getMyCart = async (profileId: string) => {
  const result = await prisma.cart.findMany({
    where: {
      profileId,
    },
    include: {
      service: true,
    },
  });

  return result;
};

const getCartItem = async (cartItemId: string) => {
  const result = await prisma.cart.findUnique({
    where: {
      id: cartItemId,
    },
    include: {
      service: true,
    },
  });

  return result;
};

export const CartService = {
  addToCart,
  removeFromCart,
  getMyCart,
  getCartItem,
};
