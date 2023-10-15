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

export const RatingService = {
  addRating,
  checkRatingGivenOrNot,
};
