import { Reviews } from '@prisma/client';
import prisma from '../../../shared/prisma';

const addReview = async (payload: Reviews) => {
  const result = await prisma.reviews.create({
    data: payload,
  });
  return result;
};

const getAllReviews = async (serviceId: string) => {
  const result = await prisma.reviews.findMany({
    where: {
      serviceId,
    },
    include: {
      profile: true,
    },
  });
  return result;
};

export const ReviewService = {
  addReview,
  getAllReviews,
};
