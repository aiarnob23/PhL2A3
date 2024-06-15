import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./booking.service";


const createBooking = catchAsync(async(req,res)=>{
    const bookingData = await req.body;
    const result = await bookingServices.createBooking(bookingData);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Booking created successfully',
        data:result,
    })
})

export const bookingControllers = {
    createBooking,
}