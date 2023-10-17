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
          profilePicture: true,
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

const deleteBlogById = async (blogId: string) => {
  const result = await prisma.blog.delete({
    where: {
      id: blogId,
    },
  });

  return result;
};

const getBlogById = async (blogId: string) => {
  const result = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
    include: {
      profile: true,
    },
  });

  return result;
};

const editBlog = async (blogId: string, payload: Partial<Blog>) => {
  const result = await prisma.blog.update({
    where: {
      id: blogId,
    },
    data: {
      title: payload.title,
      description: payload.description,
    },
  });

  return result;
};

const getLatestBlogs = async () => {
  const result = await prisma.blog.findMany({
    take: 6,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return result;
};

export const BlogService = {
  addNewBlog,
  getAllBlogs,
  deleteBlogById,
  getBlogById,
  editBlog,
  getLatestBlogs,
};
