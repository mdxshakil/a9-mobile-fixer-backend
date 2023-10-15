import { Cart } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
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

const getMyCart = async (
  profileId: string,
  paginationOptions: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await prisma.cart.findMany({
    where: {
      profileId,
    },
    include: {
      service: true,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    take: limit,
    skip,
  });

  const total = await prisma.cart.count({
    where: {
      profileId,
    },
  });

  return {
    meta: {
      page,
      limit,
      total,
      pageCount: Math.ceil(total / limit) || 1,
    },
    data: result,
  };
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
