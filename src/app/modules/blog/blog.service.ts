import { Blog } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

const addNewBlog = async (payload: Blog) => {
  const result = await prisma.blog.create({
    data: payload,
  });

  return result;
};

const getAllBlogs = async (paginationOptions: IPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await prisma.blog.findMany({
    include: {
      profile: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    take: limit,
    skip,
  });

  const total = await prisma.blog.count();

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

export const BlogService = {
  addNewBlog,
  getAllBlogs,
};
