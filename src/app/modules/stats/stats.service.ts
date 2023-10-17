import { BOOKING_STATUS, SERVICE_STATUS, USER_ROLE } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getStats = async () => {
  const userCount = await prisma.user.count({
    where: {
      role: USER_ROLE.user,
    },
  });
  const serviceCount = await prisma.service.count({
    where: {
      status: SERVICE_STATUS.live,
    },
  });
  const orderCount = await prisma.booking.count({
    where: {
      status: BOOKING_STATUS.completed,
    },
  });
  return { userCount, orderCount, serviceCount };
};

export const StatService = {
  getStats,
};
