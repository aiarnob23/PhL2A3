import httpStatus, { REQUEST_URI_TOO_LONG } from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./booking.service";
import { findUser, payableAmountCalculate } from "./booking.utils";
import { TBooking } from "./booking.interface";
import { bookingValidationSchema } from "./booking.validation";
import validateRequest from "../../middlewares/validateRequest";
import { bookings } from "./booking.model";
import AppError from "../../errors/appErrors";


const createBooking = catchAsync(async(req,res)=>{
    const bookingData : TBooking = await req.body;
    const token : any =  req?.headers?.authorization;
    const userId = await findUser(token);
    bookingData.user = userId[0]._id.toString();
    const {startTime, endTime} = bookingData;
    bookingData.payableAmount = await payableAmountCalculate(startTime,endTime);
    bookingData.isBooked="confirmed";
     validateRequest(bookingValidationSchema);

    const result = await bookingServices.createBooking(bookingData);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Booking created successfully',
        data:result,
    })
})


const cancelBooking = catchAsync(async(req,res)=>{
    const bookingId : string = req.params.id;
    const token : any = req?.headers?.authorization;
    const userId = await findUser(token);
    const bookedUser = await bookings.find({_id:bookingId},{user:1});
    if(bookedUser[0].user===userId[0]._id.toString()){
       const result = await bookingServices.deleteBooking(bookingId);
       sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Booking canceled',
        data:result
       })
    }
    else{
        throw new AppError(httpStatus.FORBIDDEN, 'Forbidden Access');
    }

})

const getBookings = catchAsync(
    async(req,res)=>{
        let result : any;
        if(req.params.id){
             result = await bookingServices.getAllBookings(req.params.id);
        }
        else{
             result = await bookingServices.getAllBookings(null);
        }
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:'Bookings fetched successfully',
            data:result,
        })
    }
)

const getAvailableTimeSlots = catchAsync(
    async(req,res)=>{
        const result = await bookingServices.getAvailableTimeSlots();
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:'Available slots',
            data:result,
        })
    }
)

export const bookingControllers = {
    createBooking,
    getBookings,
    getAvailableTimeSlots,
    cancelBooking,
}

