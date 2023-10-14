import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ServicesService } from './service.service';

const addNewService = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await ServicesService.addNewService(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New Service created successfully',
    data: result,
  });
});

const getAllService = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filterOptions = pick(req.query, ['searchTerm', 'category']);

  const result = await ServicesService.getAllService(
    paginationOptions,
    filterOptions as { searchTerm: string; category: string }
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services retrived successfully',
    data: result,
  });
});

const getUpcomingServices = catchAsync(async (req: Request, res: Response) => {
  const result = await ServicesService.getUpcomingServices();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Upcoming Services retrived successfully',
    data: result,
  });
});

const getServicesForHomePage = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ServicesService.getServicesForHomePage();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Services retrived successfully',
      data: result,
    });
  }
);

const getServicesForAdminDashboard = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ServicesService.getServicesForAdminDashboard();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Services retrived successfully',
      data: result,
    });
  }
);

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const result = await ServicesService.deleteService(serviceId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});

const getServiceById = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const result = await ServicesService.getServiceById(serviceId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service retrived successfully',
    data: result,
  });
});

const editService = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const data = req.body;
  const result = await ServicesService.editService(serviceId, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service edited successfully',
    data: result,
  });
});

export const ServiceController = {
  addNewService,
  getAllService,
  getUpcomingServices,
  getServicesForHomePage,
  getServicesForAdminDashboard,
  deleteService,
  getServiceById,
  editService,
};
