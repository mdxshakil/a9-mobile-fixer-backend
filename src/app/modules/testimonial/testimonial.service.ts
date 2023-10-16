import { Testimonial } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

const addTestimonial = async (payload: Testimonial) => {
  const result = await prisma.testimonial.create({
    data: payload,
  });
  return result;
};

const getAllTestimonialForAdminDashboard = async (
  paginationOptions: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await prisma.testimonial.findMany({
    include: {
      profile: true,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    take: limit,
    skip,
  });

  const total = await prisma.testimonial.count({});

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

const deleteTestimonial = async (testimonialId: string) => {
  const result = await prisma.testimonial.delete({
    where: {
      id: testimonialId,
    },
  });

  return result;
};

const approveUnApproveTestimonial = async (
  testimonialId: string,
  action: string
) => {
  let result;
  if (action === 'approve') {
    result = await prisma.testimonial.update({
      where: {
        id: testimonialId,
      },
      data: {
        isApproved: true,
      },
    });
  } else if (action === 'un_approve') {
    result = await prisma.testimonial.update({
      where: {
        id: testimonialId,
      },
      data: {
        isApproved: false,
      },
    });
  }

  return result;
};

const getApprovedTestimonials = async () => {
  const result = await prisma.testimonial.findMany({
    where: {
      isApproved: true,
    },
    include: {
      profile: true,
    },
  });

  return result;
};

export const TestimonialService = {
  addTestimonial,
  getAllTestimonialForAdminDashboard,
  deleteTestimonial,
  approveUnApproveTestimonial,
  getApprovedTestimonials,
};
