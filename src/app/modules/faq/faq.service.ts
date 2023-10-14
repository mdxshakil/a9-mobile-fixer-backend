import { Faq } from '@prisma/client';
import prisma from '../../../shared/prisma';

const addNewFaq = async (payload: Faq) => {
  const result = await prisma.faq.create({
    data: payload,
  });

  return result;
};

const getAllFaqs = async () => {
  const result = await prisma.faq.findMany();

  return result;
};

const getFaqById = async (faqId: string) => {
  const result = await prisma.faq.findUnique({
    where: {
      id: faqId,
    },
  });

  return result;
};

const editFaq = async (faqId: string, payload: Partial<Faq>) => {
  const result = await prisma.faq.update({
    where: {
      id: faqId,
    },
    data: {
      question: payload.question,
      answer: payload.answer,
    },
  });

  return result;
};

const deleteFaqById = async (faqId: string) => {
  const result = await prisma.faq.delete({
    where: {
      id: faqId,
    },
  });

  return result;
};

export const FaqService = {
  addNewFaq,
  getAllFaqs,
  getFaqById,
  editFaq,
  deleteFaqById,
};
