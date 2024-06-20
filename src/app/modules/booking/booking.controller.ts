import httpStatus, { REQUEST_URI_TOO_LONG } from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./booking.service";
import {
  findUser,
  payableAmountCalculate,
  bookingOverLapCheaking,
} from "./booking.utils";
import { TBooking } from "./booking.interface";
import { bookingValidationSchema } from "./booking.validation";
import validateRequest from "../../middlewares/validateRequest";
import { bookings } from "./booking.model";
import AppError from "../../errors/appErrors";

const createBooking = catchAsync(async (req, res) => {
  const bookingData: TBooking = await req.body;
  const token: any = (req?.headers?.authorization)?.split(' ')[1];
  const userId = await findUser(token);
  bookingData.user = userId[0]._id.toString();
  const { startTime, endTime, facility, date } = bookingData;
  console.log(facility);
  const overlapState = await bookingOverLapCheaking(
    facility,
    startTime,
    endTime,
    date
  );
  if (overlapState.length) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_ACCEPTABLE,
      success: false,
      message: "This time slot is already taken",
      data: null,
    });
  } else {
    bookingData.payableAmount = await payableAmountCalculate(
      startTime,
      endTime,
      facility
    );
    bookingData.isBooked = "confirmed";
    validateRequest(bookingValidationSchema);
    const result = await bookingServices.createBooking(bookingData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  }
});

const cancelBooking = catchAsync(async (req, res) => {
  const bookingId: string = req.params.id;
  const token: any = (req?.headers?.authorization)?.split(' ')[1];
  const userId = await findUser(token);
  const bookedUser = await bookings.find({ _id: bookingId }, { user: 1 });
  if (bookedUser[0].user === userId[0]._id.toString()) {
    const result = await bookingServices.deleteBooking(bookingId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking cancelled successfully",
      data: result,
    });
  } else {
    throw new AppError(httpStatus.FORBIDDEN, "Forbidden Access");
  }
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllBookings();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getUserBookings = catchAsync(async (req, res) => {
  const token = req?.headers?.authorization?.split(" ")[1];
    const id = await findUser(token || "wrongToken");
    console.log(id);
  const result = await bookingServices.getUserBookings(id[0]._id.toString());
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getAvailableTimeSlots = catchAsync(async (req, res) => {
  let queryDate = null;
  if (req.query.date) {
    queryDate = req.query.date;
  }
  const result = await bookingServices.getAvailableTimeSlots(queryDate);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Availablility checked successfully",
    data: result,
  });
});

export const bookingControllers = {
  createBooking,
  getAllBookings,
  getAvailableTimeSlots,
  cancelBooking,
  getUserBookings,
};
