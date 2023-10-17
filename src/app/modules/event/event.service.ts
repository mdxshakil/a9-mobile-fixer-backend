import { EVENT_STATUS, Event } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createEvent = async (payload: Event) => {
  const result = await prisma.event.create({
    data: payload,
  });

  return result;
};

const getAllEvents = async () => {
  const result = await prisma.event.findMany();

  return result;
};

const getUpcomingEvents = async () => {
  const result = await prisma.event.findMany({
    where: {
      status: EVENT_STATUS.upcoming,
    },
    take: 3,
  });

  return result;
};

const deleteEvent = async (eventId: string) => {
  const result = await prisma.event.delete({
    where: {
      id: eventId,
    },
  });

  return result;
};

const changeEventStatus = async (eventId: string, updatedStatus: string) => {
  const result = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      status:
        updatedStatus === 'closed'
          ? EVENT_STATUS.closed
          : EVENT_STATUS.upcoming,
    },
  });
  return result;
};

export const EventService = {
  createEvent,
  getAllEvents,
  getUpcomingEvents,
  deleteEvent,
  changeEventStatus,
};
