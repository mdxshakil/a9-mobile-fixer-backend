import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CartService } from './cart.service';

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await CartService.addToCart(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Added to cart successfully',
    data: result,
  });
});

const removeFromCart = catchAsync(async (req: Request, res: Response) => {
  const { itemId } = req.params;
  const result = await CartService.removeFromCart(itemId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Removed from cart successfully',
    data: result,
  });
});

const getMyCart = catchAsync(async (req: Request, res: Response) => {
  const { profileId } = req.params;
  const result = await CartService.getMyCart(profileId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart retrived successfully',
    data: result,
  });
});

const getCartItem = catchAsync(async (req: Request, res: Response) => {
  const { cartItemId } = req.params;
  const result = await CartService.getCartItem(cartItemId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart item retrived successfully',
    data: result,
  });
});

export const CartController = {
  addToCart,
  removeFromCart,
  getMyCart,
  getCartItem,
};
