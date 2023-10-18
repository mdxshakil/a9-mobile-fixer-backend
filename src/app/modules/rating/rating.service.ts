import { Rating } from '@prisma/client';
import prisma from '../../../shared/prisma';

const addRating = async (payload: Rating) => {
  const result = await prisma.rating.create({
    data: payload,
  });
  return result;
};

const checkRatingGivenOrNot = async (serviceId: string, profileId: string) => {
  const result = await prisma.rating.findFirst({
    where: {
      serviceId,
      profileId,
    },
  });

  return result;
};

const getRatingOfAService = async (serviceId: string) => {
  const result = await prisma.rating.aggregate({
    where: {
      serviceId,
    },
    _avg: {
      ratingValue: true,
    },
  });

  return result._avg.ratingValue || 0;
};

export const RatingService = {
  addRating,
  checkRatingGivenOrNot,
  getRatingOfAService,
};
