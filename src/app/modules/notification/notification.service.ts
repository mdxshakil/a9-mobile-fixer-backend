import prisma from '../../../shared/prisma';

const getMyNotifications = async (profileId: string) => {
  const result = await prisma.notification.findMany({
    where: {
      profileId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return result;
};

export const NotificationService = {
  getMyNotifications,
};
